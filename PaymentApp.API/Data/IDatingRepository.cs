using System.Collections.Generic;
using System.Threading.Tasks;
using PaymentApp.API.Helpers;
using PaymentApp.API.Models;

namespace PaymentApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        Task<PagedList<Plc>> GetPlcs(PlcParams plcParams);
        Task<IEnumerable<Plc>> GetPlcForDevice(int idDevice);
        Task<Product> GetProduct(int id);
        Task<PagedList<Product>> GetProducts(ProductParams productParams);

        Task<Payment> GetPayment(int id);
        Task<PagedList<Payment>> GetPayments(PaymentParams paymentParams);
    }
}