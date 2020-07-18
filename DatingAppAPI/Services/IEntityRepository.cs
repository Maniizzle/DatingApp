using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppAPI.Services
{
    public interface IEntityRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll();

        TEntity GetOne(Func<TEntity, bool> where);
    }
}