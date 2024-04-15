using Backend.Dtos;
using Backend.Enum;
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
        public async Task<ServiceResponse> Login(LoginDto loginDto)
        {
            var res = new ServiceResponse();
            var user = await _userManager.FindByNameAsync(loginDto.Email);
            if (user == null)
            {
                res.Success = false;
                res.ErrorCode = (int)EnumErrorCode.InvalidEmailOrPassword;
                res.Errors = new List<Error> {
                    new Error("Email", "Invalid email or password"),
                    new Error("Password", "Invalid email or password"),
                };
                return res;
            }
            if (!user.EmailConfirmed)
            {
                res.Success = false;
                res.ErrorCode = (int)EnumErrorCode.EmailNotConfirm;
                res.Errors = new List<Error> { new Error("Email", "Email not confirm") };
                return res;
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.PassWord, false);
            if (!result.Succeeded)
            {
                res.Success = false;
                res.ErrorCode = (int)EnumErrorCode.InvalidEmailOrPassword;
                res.Errors = new List<Error> {
                    new Error("Email", "Invalid email or password"),
                    new Error("Password", "Invalid email or password"),
                };
                return res;
            }
            return CreateApplicationUserDto(user);
        }
        [Authorize]
        [HttpGet("refresh_token")]
        public async Task<ServiceResponse> RefreshToken()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.Email)?.Value);

            return CreateApplicationUserDto(user);
        }


        [HttpPost("register")]
        public async Task<ServiceResponse> Register(RegisterDto registerDto)
        {
            var existEmail = await CheckEmailExist(registerDto.Email);
            var res = new ServiceResponse();
            if (existEmail)
            {
                res.Success = false;
                res.ErrorCode = (int)EnumErrorCode.EmailExist;
                res.Errors = new List<Error> { new Error("Email", "Email already exist") };
                return res;
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
            if (!resul.Succeeded)
            {
                res.Success = false;
                res.ErrorCode = (int)EnumErrorCode.Undefined; ;
                return res;
            };
            return res;
        }

        private async Task<bool> CheckEmailExist(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }

        #region Private Helper Methods
        private ServiceResponse CreateApplicationUserDto(User user)
        {
            var res = new ServiceResponse();
            res.Data = new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _jwtService.CreateJwt(user),
            };
            return res;
        }
        #endregion
    }
}
