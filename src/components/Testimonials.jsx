import T1 from '../assets/Testimonials/T1.png';
import T2 from '../assets/Testimonials/T2.png';
import T3 from '../assets/Testimonials/T3.png';
import T4 from '../assets/Testimonials/T4.png';
import T5 from '../assets/Testimonials/T5.png';
import T6 from '../assets/Testimonials/T6.png';
import T7 from '../assets/Testimonials/T7.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

export default function Testimonials() {
  return (
    <>
      <div className="select-none">
        <div className="text-white font-bold text-2xl md:text-4xl text-center">
          Testimonials
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          // centeredSlides={true}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper mb-24"
        >
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T7}
                alt="Testimonial 7"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T6}
                alt="Testimonial 6"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T2}
                alt="Testimonial 2"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T3}
                alt="Testimonial 3"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T4}
                alt="Testimonial 4"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T1}
                alt="Testimonial 1"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-[400px]">
              <img
                src={T5}
                alt="Testimonial 5"
                className="rounded-lg w-[950px]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
