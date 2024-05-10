export default function Education() {
  return (
    <section id="eductaion" class="bg-custom-gray rounded-3xl p-4 mt-8">
      <div class="flex flex-col justify-between min-h-fit my-4">
        <div class="m-4">
          <h2 class="text-2xl font-bold mb-6">Boost your customer base</h2>
          <p class="text-lg">
            Learn how to attract more customers with these Simple tips
          </p>
        </div>
        <div class="flex justify-around mx-10 gap-4 -lg:mx-0 -sm:flex-col mt-10">
          <a
            href="https://example.com/"
            class="bg-white px-14 py-3 rounded-3xl text-bs font-semibold hover:bg-custom-red hover:text-white md:px-8 text-center"
          >
            Social Media
          </a>
          <a
            href="https://example.com/"
            class="bg-white px-14 py-3 rounded-3xl text-bs font-semibold hover:bg-custom-red hover:text-white md:px-8 text-center"
          >
            online advertising
          </a>
          <a
            href="https://example.com/"
            class="bg-white px-14 py-3 rounded-3xl text-bs font-semibold hover:bg-custom-red hover:text-white md:px-8 text-center"
          >
            referral program
          </a>
        </div>
      </div>
    </section>
  );
}
