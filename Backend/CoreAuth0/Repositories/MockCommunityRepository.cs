using System.Collections.Generic;
using CoreAuth0.Entities;

namespace CoreAuth0.Repositories
{
    public class MockCommunityRepository : ICommunityRepository
    {
        public IEnumerable<Community> GetAll()
        {
            int index = 0;

            var result = new List<Community> {
                new Community { CommunityId = ++index, Name = "Xamarin Cali", Url = "https://www.meetup.com/Xamarin-Cali/" },
                new Community { CommunityId = ++index, Name = "CaliJS", Url = "https://www.meetup.com/calijs/" },
                new Community { CommunityId = ++index, Name = "Python Cali", Url = "https://www.meetup.com/Python-Cali/" },
                new Community { CommunityId = ++index, Name = "GDG Cali", Url = "https://www.meetup.com/GDGCali" },
                new Community { CommunityId = ++index, Name = "Geeks Girls", Url = "http://geekgirlslatam.org/"}
            };

            return result;

        }
    }
}
