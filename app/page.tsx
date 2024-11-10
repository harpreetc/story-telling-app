"use client";

import { useState } from "react";
import { useChat } from "ai/react";

// Add this before defaultCharacters
type Character = {
  id: number;
  name: string;
  description: string;
  personality: string;
};

const defaultCharacters: Character[] = [
  {
    id: 1,
    name: "Luna",
    description: "A wise owl who lives in an ancient library",
    personality: "Intellectual, patient, and slightly mysterious"
  },
  {
    id: 2,
    name: "Max",
    description: "A brave young knight in training",
    personality: "Enthusiastic, determined, and sometimes impulsive"
  },
  {
    id: 3,
    name: "Flora",
    description: "A nature-loving fairy",
    personality: "Gentle, caring, and playful"
  },
  {
    id: 4,
    name: "Spark",
    description: "A mischievous fire spirit",
    personality: "Energetic, witty, and occasionally troublesome"
  },
  {
    id: 5,
    name: "Captain Storm",
    description: "A seasoned pirate captain",
    personality: "Bold, adventurous, and strategic"
  }
];

const genres = [
  { emoji: "🧙", value: "Fantasy" },
  { emoji: "🕵️", value: "Mystery" },
  { emoji: "💑", value: "Romance" },
  { emoji: "🚀", value: "Sci-Fi" },
];
const tones = [
  { emoji: "😊", value: "Happy" },
  { emoji: "😢", value: "Sad" },
  { emoji: "😏", value: "Sarcastic" },
  { emoji: "😂", value: "Funny" },
];

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const [characters, setCharacters] = useState(defaultCharacters);
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

  const toggleCharacter = (id: number) => {
    setSelectedCharacters(prev => 
      prev.includes(id) ? prev.filter(charId => charId !== id) : [...prev, id]
    );
  };

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  
  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-black">Story Telling App</h2>
            <p>
              Customize the story by selecting the genre and tone.
            </p>
          </div>
          <div className="max-w-4xl mx-auto p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Select Characters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map(char => (
              <div key={char.id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <input
                    type="checkbox"
                    checked={selectedCharacters.includes(char.id)}
                    onChange={() => toggleCharacter(char.id)}
                    className="mt-1"
                  />
                </div>
                <h3 className="font-bold">{char.name}</h3>
                <p className="text-sm">{char.description}</p>
                <p className="text-sm italic">{char.personality}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.genre} story in a ${state.tone} tone, with the following characters: ${selectedCharacters.map(id => characters.find(char => char.id === id)?.name).join(', ')}`,
              })
            }
          >
            Generate Story
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}