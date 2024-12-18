/**
 * Swiper init function.
 * @param {number} carouselName - The parameter is used for the carousel's name.
 * @param {number} carouselClass - The parameter is used for the carousel's class.
 * @param {number} carouselProps - The parameter is used for the carousel's properties.
 */

class SwiperHelper {
    swiperInit(carouselName, carouselClass, carouselProps) {
        new Swiper(carouselClass, {
            init: true,
            loop: false,
            arrows: false,
            navigation: {
                prevEl: `.swiper-button-prev-${carouselName}`,
                nextEl: `.swiper-button-next-${carouselName}`,
            },
            pagination: {
                el: `.swiper-pagination-${carouselName}`,
                type: "bullets",
                clickable: true,
            },
            ...carouselProps,
        });
    }
}

// -- Example -- //

/* 
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>

    <div class="controls">
        <div class="swiper-pagination-example bullets-wrapper"></div>
    </div>
</div> 
*/

// handleDOM() {
//     this.example = document.querySelector(".homepage .swiper-container");
// }
// handleEvents() {
//     swiperHelper.swiperInit("example", self.example, { slidesPerView: 2 });
// }

// -- End Example -- //
