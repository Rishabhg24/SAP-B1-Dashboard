using System.Text;

using Loginpage.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// =========================================
// CONTROLLERS
// =========================================

builder.Services.AddControllers();

// =========================================
// SERVICES
// =========================================

builder.Services.AddScoped<
IAuthService,
AuthService>();

builder.Services.AddScoped<
JwtService>();

// =========================================
// SWAGGER
// =========================================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

// =========================================
// CORS
// =========================================

builder.Services.AddCors(options =>
{
    options.AddPolicy(


    "AllowAll",

        policy =>
        {
            policy.AllowAnyOrigin()

                  .AllowAnyHeader()

                  .AllowAnyMethod();
        });


});

// =========================================
// JWT AUTHENTICATION
// =========================================

builder.Services

.AddAuthentication(

JwtBearerDefaults
    .AuthenticationScheme


)

.AddJwtBearer(options =>
{
    options.TokenValidationParameters =

    new TokenValidationParameters
    {
        // VALIDATIONS

        ValidateIssuer = true,

        ValidateAudience = true,

        ValidateLifetime = true,

        ValidateIssuerSigningKey = true,

        // ISSUER

        ValidIssuer =
            builder.Configuration[
                "Jwt:Issuer"
            ],

        // AUDIENCE

        ValidAudience =
            builder.Configuration[
                "Jwt:Audience"
            ],

        // SECRET KEY

        IssuerSigningKey =

            new SymmetricSecurityKey(

                Encoding.UTF8.GetBytes(

                    builder.Configuration[
                        "Jwt:Key"
                    ]!
                )
            )
    };


});

// =========================================
// AUTHORIZATION
// =========================================

builder.Services
.AddAuthorization();

var app = builder.Build();

// =========================================
// SWAGGER
// =========================================

app.UseSwagger();

app.UseSwaggerUI();

// =========================================
// HTTPS
// =========================================

app.UseHttpsRedirection();

// =========================================
// CORS
// =========================================

app.UseCors("AllowAll");

// =========================================
// JWT MIDDLEWARE
// =========================================

app.UseAuthentication();

app.UseAuthorization();

// =========================================
// MAP CONTROLLERS
// =========================================

app.MapControllers();

app.Run();
