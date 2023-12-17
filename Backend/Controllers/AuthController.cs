using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(IJwtService jwtService, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _jwtService = jwtService;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
            {

                return Unauthorized(new Dictionary<string, object>
                {
                    { "errorMessage", "ERROR_MESSAGES.INVALID_USERNAME_PASSWORD" },
                    { "errorCode", 999 },
                    { "message", "Invalid username or password." }
                });
            }
            if (!user.EmailConfirmed)
            {
                return Unauthorized(new Dictionary<string, object>
                {
                    { "errorMessage", "ERROR_MESSAGES.EMAIL_NOT_CONFIRM" },
                    { "errorCode", 998 },
                    { "message", "Please confirm your email." }
                });
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.PassWord, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new Dictionary<string, object>
                {
                    { "errorMessage", "ERROR_MESSAGES.INVALID_USERNAME_PASSWORD" },
                    { "errorCode", 999 },
                    { "message", "Invalid username or password." }
                });
            }
            return CreateApplicationUserDto(user);
        }
        [Authorize]
        [HttpGet("refresh_token")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.Email)?.Value);

            return CreateApplicationUserDto(user);
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var existEmail = await CheckEmailExist(registerDto.Email);
            if (existEmail)
            {
                return BadRequest(new Dictionary<string, object>
                {
                    { "errorMessage", "ERROR_MESSAGES.EMAIL_ALREADY_EXIST" },
                    { "errorCode", 997 },
                    { "message", "Email already exist. Please try with another email address." }
                });
            }
            var userToAdd = new User
            {
                Email = registerDto.Email.ToLower(),
                LastName = registerDto.LastName,
                FirstName = registerDto.FirstName,
                UserName = registerDto.Email.ToLower(),
                EmailConfirmed = true
            };

            var resul = await _userManager.CreateAsync(userToAdd, registerDto.PassWord);
            if (!resul.Succeeded) return BadRequest(resul.Errors);
            return Ok();
        }

        private async Task<bool> CheckEmailExist(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }

        #region Private Helper Methods
        private UserDto CreateApplicationUserDto(User user)
        {
            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _jwtService.CreateJwt(user),
            };
        }
        #endregion
    }
}
