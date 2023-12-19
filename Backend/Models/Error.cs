namespace Backend.Models
{
    public class Error
    {
        public string Field { get; set; }
        public string ErrorMessage { get; set; }
        public Error(string field, string errorMessage)
        {
            this.Field = field;
            this.ErrorMessage = errorMessage;
        }
        public Error()
        {

        }
    }
}
