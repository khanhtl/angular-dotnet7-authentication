using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class RegisterDto
    {
        [Required]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "First name must be at least {2}, and maximum {1} characters")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Last name must be at least {2}, and maximum {1} characters")]
        public string LastName { get; set; }
        [Required]
        [RegularExpression("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 8, ErrorMessage = "Password must be at least {2}, and maximum {1} characters")]
        public string PassWord { get; set; }
    }
}
