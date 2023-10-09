using KnilaAPI.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KnilaAPI.Services
{
    public interface IContactService
    {
        Task<List<ContactDTO>> GetContacts(int id);
        Task<int> SaveContacts(ContactDTO request);
        Task<int> DeleteContacts(int id);
        Task<TokenDTO> Login(LoginDTO user);
        Task<int> Logout();
        Task<TokenDTO> RefershToken(TokenDTO req);
        Task<int> SaveUser(UserDTO req);
        Task<List<CityDTO>> GetCities();
        Task<List<StateDTO>> GetStates();
        Task<List<CountryDTO>> GetCountries();
    }
}
