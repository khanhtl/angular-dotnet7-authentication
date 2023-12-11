using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class Context : IdentityDbContext<User>
    {
        public Context(DbContextOptions options) : base(options) { }

    }
}
