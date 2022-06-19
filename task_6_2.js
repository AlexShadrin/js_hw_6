"use strict";

const gallery = {
    settings: {
        galleryMainContainer: '.galleryContainer',
        previewSelector: '.myPreviewSelector',
        modalImageContainer: 'gallery__modal',
        modalImageClass: 'gallery__image',
        modalImageScreen: 'gallery__screen',
        modalImageClose: 'gallery__close',
        modalImageCloseSrc: 'images/gallery/close.png',
    },

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        const galleryContainer = document.querySelector(this.settings.previewSelector);
        galleryContainer.addEventListener('click', (event) => this.containerClickHandler(event));
    },

    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') {
            return;
        }

        this.createGalleryModal(event.target);
    },

    createGalleryModal(img) {
        const galleryModal = document.createElement('div');
        galleryModal.classList.add(this.settings.modalImageContainer);

        const galleryScreen = document.createElement('div');
        galleryScreen.classList.add(this.settings.modalImageScreen);
        galleryModal.appendChild(galleryScreen);

        const galleryClose = new Image();
        galleryClose.classList.add(this.settings.modalImageClose);
        galleryClose.src = this.settings.modalImageCloseSrc;
        galleryClose.addEventListener('click', (event) => {
            this.close(event.target);
        });
        galleryModal.appendChild(galleryClose);

        const galleryImage = new Image();
        galleryImage.classList.add(this.settings.modalImageClass);
        galleryImage.src = img.dataset.fullImageUrl;
        galleryModal.appendChild(galleryImage);

        document.querySelector(this.settings.galleryMainContainer).appendChild(galleryModal);
    },

    close(closeImg) {
        closeImg.parentElement.remove();
    }
};

window.addEventListener('load', () => {
    gallery.init({
        galleryMainContainer: '.gallery',
        previewSelector: '.gallery__container',
        modalImageScreen: 'gallery__back',
    });
});