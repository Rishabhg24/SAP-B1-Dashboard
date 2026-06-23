using Loginpage.Models;

namespace Loginpage.Services
{
    public interface IAuthService
    {
        Task<ApiResponse> SignupAsync(
            SignupRequest request);

        Task<ApiResponse> LoginAsync(
            LoginRequest request);

        Task<ApiResponse> LogoutAsync();

        Task<List<UserModel>> GetAllUsersAsync();
    }
}