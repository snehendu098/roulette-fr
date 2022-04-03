import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Listbox } from "@headlessui/react";
import { useState } from "react";

const people = [
  { id: 1, name: "1 : 1.25", returnTimes: 1.25 },
  { id: 2, name: "1 : 1.5", returnTimes: 1.5 },
  { id: 3, name: "1 : 1.75", returnTimes: 1.75 },
  { id: 4, name: "1 : 2", returnTimes: 2 },
];

const RatioFix = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  console.log(selectedPerson);

  return (
    <div className="min-w-[70vw] mt-5 p-3 rounded">
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <div className="bg-white rounded-md">
          <Listbox.Button className={`w-full p-3`}>
            {selectedPerson.name}
          </Listbox.Button>
        </div>
        <Listbox.Options className={`mt-2`}>
          {people.map((person) => (
            <div key={person.id} className="bg-white p-3 border-b-2">
              <Listbox.Option value={person}>{person.name}</Listbox.Option>
            </div>
          ))}
        </Listbox.Options>
      </Listbox>
      <div className="mt-2 bg-slate-900 text-white text-center p-3 rounded-xl">
        Proceed
      </div>
    </div>
  );
};

export default RatioFix;
