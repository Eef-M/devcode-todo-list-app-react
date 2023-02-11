import { Disclosure } from "@headlessui/react";

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-sky-500">
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-20">
        <div className="relative flex h-24 items-center justify-between">
          <div data-cy="header-background" className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h2 data-cy="header-title" className="text-2xl font-bold text-white">TO DO LIST APP</h2>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
