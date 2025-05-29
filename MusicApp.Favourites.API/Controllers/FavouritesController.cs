using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MusicApp.Favourites.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetFavourites()
        {
            return Ok("from favourites");
        }
    }
}
