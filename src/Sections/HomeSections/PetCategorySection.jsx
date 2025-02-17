import rabbit from "../../assets/photos/rabbit.jpg";
import birds from "../../assets/photos/birds.jpg";
import cat from "../../assets/photos/cat.jpg";
import dog from "../../assets/photos/dog.jpg";
import fish from "../../assets/photos/fish.jpg";

const PetCategorySection = ({ sectionLearnRef }) => {
  return (
    <div
      ref={sectionLearnRef}
      className="bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-50 dark:bg-gradient-to-br dark:from-[#111827]/70 dark:via-[#111827]/80 dark:to-[#111827]/60 px-3 xl:px-0"
    >
      <div className="py-8 md:py-16 container mx-auto flex flex-col items-center">
        <h1 className="poppins font-semibold text-2xl md:text-4xl uppercase text-center text-black dark:text-white/80">
          The categories we provide
        </h1>
        <p className="roboto text-lg md:text-xl font-semibold text-black/50 mb-10  md:mt-4 text-black dark:text-white/80">
          View the amazing pets from here!!!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-10">
          {/* Card for each category */}
          {[
            { src: cat, alt: "Cat category", category: "Cats" },
            { src: dog, alt: "Dog category", category: "Dogs" },
            { src: rabbit, alt: "Rabbit category", category: "Rabbits" },
            { src: birds, alt: "Bird category", category: "Birds" },
            { src: fish, alt: "Fish category", category: "Fishes" },
          ].map((item, index) => (
            <div
              key={index}
              className="md:w-64 md:h-52 hover:transform hover:translate-y-[-10px] transition-transform duration-300 group"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="rounded-lg shadow-md"
              />

              <h1 className="lg:hidden group-hover:block nunito uppercase text-center font-bold text-xl mt-2 text-black dark:text-white/80">
                {item.category}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCategorySection;
