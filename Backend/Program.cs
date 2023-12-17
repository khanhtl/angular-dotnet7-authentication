using Backend.Extensions;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

string AllowAnyOriginPolicy = "AllowAnyOrigin";

var builder = WebApplication.CreateBuilder(args);
builder.Services.UseLocalization();

// Add services to the container.

builder.Services.AddControllerWithFilter().UseCustomJsonResponse();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext(builder.Configuration);
builder.Services.UseIdentity();
builder.Services.AddAppAuthentication(builder.Configuration);
builder.Services.ProvideServices(builder.Configuration);
builder.Services.AddAppCors(AllowAnyOriginPolicy);

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.ConfigureApiBehavior();

var app = builder.Build();

app.UseCors(AllowAnyOriginPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
