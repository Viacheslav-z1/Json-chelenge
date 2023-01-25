$(function () {
  const jobsList = document.querySelector(".employee__list");

  let jobsData = null;
  getJobsData();
  async function getJobsData() {
    await fetch("./data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        jobsData = data;
      });
    renderAllList(jobsData);
  }

  function renderAllList(array) {
    let jobsHtml = array
      .map((job) => {
        let tags = job.languages;
        tags = tags.concat(job.tools);

        let tagsHtml = tags
          .map((tag) => {
            return `
          <li class="employee__tags-item">${tag}</li>
           `;
          })
          .join(" ");

        return `
            <li class="employee__item">
                <div class="employee__info">
                  <div class="employee__img-box">
                    <img
                      src="${job.logo}"
                      alt="logo"
                      class="employee__img"
                    />
                  </div>
                  <div class="employee__info-box">
                    <ul class="employee__info-icons">
                      <li class="employee__info-icons-item employee__info-icons-item-name">
                        ${job.company}
                      </li>
                      ${
                        job.new
                          ? `<li class="employee__info-icons-item employee__info-icons-item-new">New!</li>`
                          : ``
                      }
  ${
    job.featured
      ? `<li class="employee__info-icons-item employee__info-icons-item-featured">Featured</li>`
      : ``
  }
                      
                    </ul>
                    <p class="employee__position">${job.position}</p>
                    <div class="employee__info-details">
                      <ul class="employee__info-details__list">
                        <li class="employee__info-details__list-item">
                        ${job.postedAt}
                        </li>
                        <li class="employee__info-details__list-item">
                          ${job.contract}
                        </li>
                        <li class="employee__info-details__list-item">
                          ${job.location}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="employee__tags-list">
                ${tagsHtml}
                </ul>
              </li>
      `;
      })
      .join(" ");

    jobsList.innerHTML = jobsHtml;
  }
});
