using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

using Microsoft.IdentityModel.Tokens;

namespace Loginpage.Services;

public class JwtService
{
// =========================================
// CONFIGURATION
// =========================================

private readonly IConfiguration
    _configuration;

    // =========================================
    // CONSTRUCTOR
    // =========================================

    public JwtService(
        IConfiguration configuration
    )
    {
        _configuration =
            configuration;
    }

    // =========================================
    // GENERATE JWT TOKEN
    // =========================================

    public string GenerateToken(

        string username,

        string role,

        string email
    )
    {
        // =====================================
        // CLAIMS
        // =====================================

        var claims = new[]
        {
        // USERNAME

        new Claim(
            ClaimTypes.Name,
            username
        ),

        // ROLE

        new Claim(
            ClaimTypes.Role,
            role
        ),

        // EMAIL

        new Claim(
            ClaimTypes.Email,
            email
        )
    };

        // =====================================
        // SECRET KEY
        // =====================================

        var key =
            new SymmetricSecurityKey(

                Encoding.UTF8.GetBytes(

                    _configuration[
                        "Jwt:Key"
                    ]!
                )
            );

        // =====================================
        // SIGNING CREDENTIALS
        // =====================================

        var creds =
            new SigningCredentials(

                key,

                SecurityAlgorithms
                    .HmacSha256
            );

        // =====================================
        // TOKEN
        // =====================================

        var token =
            new JwtSecurityToken(

                issuer:
                    _configuration[
                        "Jwt:Issuer"
                    ],

                audience:
                    _configuration[
                        "Jwt:Audience"
                    ],

                claims:
                    claims,

                expires:
                    DateTime.Now
                        .AddMinutes(60),

                signingCredentials:
                    creds
            );

        // =====================================
        // RETURN TOKEN
        // =====================================

        return new JwtSecurityTokenHandler()

            .WriteToken(token);
    }
}
