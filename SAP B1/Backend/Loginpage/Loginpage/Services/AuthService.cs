using Loginpage.Models;

using Microsoft.Data.SqlClient;

using System.Data;

namespace Loginpage.Services
{
    public class AuthService
    : IAuthService
    {
// =========================================
// VARIABLES
// =========================================

    private readonly IConfiguration
        _configuration;

        private readonly JwtService
            _jwtService;

        // =========================================
        // CONSTRUCTOR
        // =========================================

        public AuthService(

            IConfiguration configuration,

            JwtService jwtService
        )
        {
            _configuration =
                configuration;

            _jwtService =
                jwtService;
        }

        // =========================================
        // SIGNUP
        // =========================================

        public async Task<ApiResponse>
        SignupAsync(
            SignupRequest request
        )
        {
            try
            {
                string connectionString =

                    _configuration
                        .GetConnectionString(
                            "DefaultConnection"
                        );

                // HASH PASSWORD

                string hashedPassword =

                    BCrypt.Net.BCrypt
                        .HashPassword(
                            request.Password
                        );

                using SqlConnection con =

                    new SqlConnection(
                        connectionString
                    );

                using SqlCommand cmd =

                    new SqlCommand(
                        "SignUP",
                        con
                    );

                cmd.CommandType =
                    CommandType.StoredProcedure;

                // PARAMETERS

                cmd.Parameters.AddWithValue(
                    "@Username",
                    request.Username
                );

                cmd.Parameters.AddWithValue(
                    "@Password",
                    hashedPassword
                );

                cmd.Parameters.AddWithValue(
                    "@Email",
                    request.Email
                );

                cmd.Parameters.AddWithValue(
                    "@Phone",
                    request.Phone
                );

                cmd.Parameters.AddWithValue(
                    "@Role",
                    request.Role
                );

                await con.OpenAsync();

                await cmd.ExecuteNonQueryAsync();

                return new ApiResponse
                {
                    Success = true,

                    Message =
                        "User Registered Successfully"
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Success = false,

                    Message =
                        ex.Message
                };
            }
        }

        // =========================================
        // LOGIN
        // =========================================

        public async Task<ApiResponse>
        LoginAsync(
            LoginRequest request
        )
        {
            try
            {
                string connectionString =

                    _configuration
                        .GetConnectionString(
                            "DefaultConnection"
                        );

                using SqlConnection con =

                    new SqlConnection(
                        connectionString
                    );

                // =====================================
                // GET USER DATA
                // =====================================

                using SqlCommand cmd =

                    new SqlCommand(

                        @"SELECT

                        U_U_PASSWORD,
                        U_U_ROLE,
                        U_U_EMAIL

                      FROM [@APP_USERS]

                      WHERE U_U_USERNAME =
                      @Username",

                        con
                    );

                cmd.Parameters.AddWithValue(
                    "@Username",
                    request.Username
                );

                await con.OpenAsync();

                using SqlDataReader reader =

                    await cmd.ExecuteReaderAsync();

                // USER NOT FOUND

                if (!await reader.ReadAsync())
                {
                    return new ApiResponse
                    {
                        Success = false,

                        Message =
                            "Invalid Username or Password"
                    };
                }

                // =====================================
                // DATABASE VALUES
                // =====================================

                string hashedPassword =

                    reader["U_U_PASSWORD"]
                        .ToString();

                string role =

                    reader["U_U_ROLE"]
                        .ToString();

                string email =

                    reader["U_U_EMAIL"]
                        .ToString();

                // =====================================
                // VERIFY PASSWORD
                // =====================================

                bool isPasswordValid =

                    BCrypt.Net.BCrypt.Verify(

                        request.Password,

                        hashedPassword
                    );

                // INVALID PASSWORD

                if (!isPasswordValid)
                {
                    return new ApiResponse
                    {
                        Success = false,

                        Message =
                            "Invalid Username or Password"
                    };
                }

                // =====================================
                // GENERATE JWT TOKEN
                // =====================================

                string token =

                    _jwtService
                        .GenerateToken(

                            request.Username,

                            role,

                            email
                        );

                // =====================================
                // SUCCESS
                // =====================================

                return new ApiResponse
                {
                    Success = true,

                    Message =
                        "Login Successful",

                    Token = token
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Success = false,

                    Message =
                        ex.Message
                };
            }
        }

        // =========================================
        // GET ALL USERS
        // =========================================

        public async Task<List<UserModel>>
        GetAllUsersAsync()
        {
            List<UserModel> users =
                new List<UserModel>();

            try
            {
                string connectionString =

                    _configuration
                        .GetConnectionString(
                            "DefaultConnection"
                        );

                using SqlConnection con =

                    new SqlConnection(
                        connectionString
                    );

                using SqlCommand cmd =

                    new SqlCommand(

                        @"SELECT

                        U_U_USERNAME,
                        U_U_EMAIL,
                        U_U_PHONE,
                        U_U_ROLE

                      FROM [@APP_USERS]",

                        con
                    );

                await con.OpenAsync();

                using SqlDataReader reader =

                    await cmd
                        .ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    users.Add(

                        new UserModel
                        {
                            Username =

                                reader[
                                    "U_U_USERNAME"
                                ]
                                .ToString(),

                            Email =

                                reader[
                                    "U_U_EMAIL"
                                ]
                                .ToString(),

                            Phone =

                                reader[
                                    "U_U_PHONE"
                                ]
                                .ToString(),

                            Role =

                                reader[
                                    "U_U_ROLE"
                                ]
                                .ToString()
                        });
                }
            }
            catch (Exception)
            {
                throw;
            }

            return users;
        }

        // =========================================
        // LOGOUT
        // =========================================

        public async Task<ApiResponse>
        LogoutAsync()
        {
            try
            {
                await Task.CompletedTask;

                return new ApiResponse
                {
                    Success = true,

                    Message =
                        "Logout Successful"
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Success = false,

                    Message =
                        ex.Message
                };
            }
        }
    }


}
