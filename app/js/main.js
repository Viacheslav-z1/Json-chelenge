$(function () {
  const jobsList = document.querySelector(".employee__list");
  const addTagBtn = document.querySelector(".form__input-btn");
  const input = document.querySelector(".form__input");
  const tagsParr = document.querySelector(".form__tags");
  const clearBtn = document.querySelector(".form__clear");
  const form = document.querySelector(".form");
  let filterArr = [];

  form.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
      event.preventDefault();
      if (input.value && input.value.length < 20) {
        let tagHtml = `
            <li class="form__tags-item">
              <span class="form__tag-js">${input.value}</span>  
              <button class="form__tags-item-btn">X</button>
            </li>
       `;
        tagsParr.innerHTML += tagHtml;
        let deleteBtns = document.querySelectorAll(".form__tags-item-btn");
        deleteBtns.forEach((deleteBtn) => {
          deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.parentElement.remove();
            createSearchArr();
            createFilteredJobs(jobsData);
          });
        });
        input.value = "";

        createSearchArr();
        createFilteredJobs(jobsData);
      } else {
        alert("Мінамальна довжина тегу - 1 символ, максимальна - 20");
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value && input.value.length < 20) {
      let tagHtml = `
            <li class="form__tags-item">
              <span class="form__tag-js">${input.value}</span>  
              <button class="form__tags-item-btn">X</button>
            </li>
      `;
      tagsParr.innerHTML += tagHtml;
      let deleteBtns = document.querySelectorAll(".form__tags-item-btn");
      deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.target.parentElement.remove();
          createSearchArr();
          createFilteredJobs(jobsData);
        });
      });
      input.value = "";

      createSearchArr();
      createFilteredJobs(jobsData);
    } else {
      alert("Мінамальна довжина тегу - 1 символ, максимальна - 20");
    }
  });

  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tagsParr.innerHTML = "";
    createSearchArr();
    renderAllList(jobsData);
  });

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
    createFilteredJobs(jobsData);
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

  function isSearchArr(searchArr, arr) {
    let flag = false;
    for (let i = 0; i < searchArr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (searchArr[i].toLowerCase() == arr[j].toLowerCase()) {
          flag = true;
        }
      }
    }
    return flag;
  }

  function createFilteredJobs(array) {
    if (filterArr.length > 0) {
      let jobsHtml = array
        .map((job, i) => {
          let tags = job.languages;
          tags = tags.concat(job.tools);

          if (isSearchArr(filterArr, tags)) {
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
                        ? `<li class="employee__info-icons-item                        employee__info-icons-item-featured">Featured</li>`
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
          } 
        })
        .join(" ");
      jobsList.innerHTML = jobsHtml;
    } else {
      renderAllList(jobsData);
    }
  }

  function createSearchArr() {
    const filterTags = document.querySelectorAll(".form__tag-js");
    let newArr = [];
    filterTags.forEach((item) => {
      let tag = item.textContent;
      newArr.push(tag);
    });
    filterArr = newArr;
  }
});
