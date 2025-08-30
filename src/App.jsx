import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const initialCombinations = [
    "a", "i", "u", "e", "Ka", "Ki", "Ku", "Ko", "Sa", "Shi", "Su", "Se", "So", 
    "ta", "chi", "tsu", "tu", "to", "na", "ni", "nu", "Ne", "No", "Ha", "Hi", 
    "Fu", "He", "Ho", "Ma", "Mi", "Mu", "Me", "Mo", "Ya", "Yu", "Yo", "Ra", 
    "Re", "Ri", "Ro", "Ru", "Wa", "o"
  ];

  const [availableCombinations, setAvailableCombinations] = useState([...initialCombinations]);
  const [pickedCombinations, setPickedCombinations] = useState([]);
  const [currentPick, setCurrentPick] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const pickRandomCombination = () => {
    if (availableCombinations.length === 0) {
      setIsFinished(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCombinations.length);
    const randomCombination = availableCombinations[randomIndex];
    
    // Update state
    const newAvailable = availableCombinations.filter((_, index) => index !== randomIndex);
    const newPicked = [...pickedCombinations, randomCombination];
    
    setAvailableCombinations(newAvailable);
    setPickedCombinations(newPicked);
    setCurrentPick(randomCombination);
    
    if (newAvailable.length === 0) {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setAvailableCombinations([...initialCombinations]);
    setPickedCombinations([]);
    setCurrentPick('');
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🎌 Hiragana Picker
        </h1>
        
        <div className="text-center mb-6">
          <div className="text-sm text-gray-600 mb-2">
            Remaining: {availableCombinations.length} | Picked: {pickedCombinations.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(pickedCombinations.length / initialCombinations.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {!isFinished ? (
          <div className="text-center">
            <div className="mb-6">
              {currentPick && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-4">
                  <p className="text-lg text-gray-700 mb-2">Your random combination is:</p>
                  <p className="text-4xl font-bold text-purple-600">{currentPick}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={pickRandomCombination}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {currentPick ? 'Get Another Rizz! 🎲' : 'Get Random Combination! 🎲'}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-4">
              <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 All Done!</h2>
              <p className="text-gray-700">All combinations have been picked!</p>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Over 🔄
            </button>
          </div>
        )}

        {pickedCombinations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Picked Combinations:</h3>
            <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-3">
              <div className="flex flex-wrap gap-2">
                {pickedCombinations.map((combo, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-2 py-1 rounded text-sm font-medium"
                  >
                    {combo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-center text-xs text-gray-500">
          #SenadorJaniel
        </div>
      </div>
    </div>
  );
};

export default App
