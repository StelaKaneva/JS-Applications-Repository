import { html } from '../lib.js';
import { getUserData } from '../util.js';
import { getMyTheaters } from '../api/data.js';

const profileTemplate = (theaters, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${theaters.length == 0 ?
        html`<div class="no-events">
                <p>This user has no events yet!</p>
             </div>` 
             : html`<div class="eventBoard">
            ${theaters.map(theaterCard)}
            </div>`}
    </div>
</section>`;

const theaterCard = (theater) => html`
<div class="event-info">
    <img src=${theater.imageUrl}>
    <h2>${theater.title}</h2>
    <h6>${theater.date}</h6>
    <a href="/details/${theater._id}" class="details-button">Details</a>
</div>`;

export async function profilePage(ctx) {
    const userData = getUserData();

    const theaters = await getMyTheaters(userData.id);
    
    ctx.render(profileTemplate(theaters, userData));
}