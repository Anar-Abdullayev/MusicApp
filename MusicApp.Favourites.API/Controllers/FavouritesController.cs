using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MusicApp.Favourites.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetFavourites()
        {
            return Ok("from favourites");
        }

        [HttpPost]
        public async Task<ActionResult> AddFavourite([FromBody] int musicId)
        {

            return Ok();
        }
    }
}
