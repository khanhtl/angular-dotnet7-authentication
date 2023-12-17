using System.Collections.Generic;

namespace Backend.Models
{
    public class Error
    {
        public string Field { get; set; }
        public List<string> Errors { get; set; }
    }
}
