using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreAuth0.Entities;
using CoreAuth0.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoreAuth0.Controllers
{
    [Route("api/communities")]
    [ApiController]
    public class CommunityController : ControllerBase
    {
        private ICommunityRepository communityRepository;

        public CommunityController(ICommunityRepository repository) {
            communityRepository = repository;
        }

        [HttpGet]
        public IEnumerable<Community> Get() {

            var communities = communityRepository.GetAll();
            return communities;

        }

    }
}