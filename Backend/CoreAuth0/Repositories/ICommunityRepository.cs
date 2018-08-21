using CoreAuth0.Entities;
using System.Collections.Generic;

namespace CoreAuth0.Repositories
{
    public interface ICommunityRepository
    {

        IEnumerable<Community> GetAll();

    }
}
