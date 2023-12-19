using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string PassWord { get; set; }
    }
}
