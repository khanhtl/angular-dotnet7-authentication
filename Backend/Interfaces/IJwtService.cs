using Backend.Models;

namespace Backend.Interfaces
{
    public interface IJwtService
    {
        string CreateJwt(User user);
    }
}
