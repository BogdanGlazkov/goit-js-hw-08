import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
    </a>
    </div>`;
  })
  .join("");

galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

galleryEl.addEventListener("click", (event) => {
  if (event.target.nodeName !== "IMG") return;
  event.preventDefault();

  const modalMarkup = `<img
      class="gallery__image"
      src="${event.target.dataset.source}"
      alt="${event.target.description}"
    />`;

  const modal = basicLightbox.create(modalMarkup, {
    onShow: () => {
      addEventListener("keydown", closeOnEsc);
    },
    onClose: () => {
      removeEventListener("keydown", closeOnEsc);
    },
  });

  modal.show();

  function closeOnEsc(event) {
    if (event.code === "Escape") modal.close();
  }
});
