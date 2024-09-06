import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import ConfettiExplosion from "react-confetti-explosion";
import { Switch } from "./ui/switch";

export function Board() {
  const [binaryInputs, setBinaryInputs] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const binaryValues = [128, 64, 32, 16, 8, 4, 2, 1];
  const [target, setTarget] = useState(0);
  const [hint, setHint] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    generateNewTarget();
  }, []);

  const randomSuccessMessage = () => {
    const messages = [
      "Well done!",
      "Great job!",
      "You're a natural!",
      "You're a genius!",
      "You're on fire!",
      "You're unstoppable!",
      "You're unbeatable!",
      "You're a star!",
      "You're a winner!",
      "You're a champion!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const randomErrorMessage = () => {
    const messages = [
      "Not quite. Keep trying!",
      "Nice try! Keep going!",
      "You're almost there!",
      "You're so close!",
      "You're getting warmer!",
      "You're getting closer!",
      "You're almost there!",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const submit = () => {
    const decimal = calculateDecimal();
    if (decimal === target) {
      setMessage(randomSuccessMessage());
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(generateNewTarget, 1500);
      console.log(newScore >= 5, newScore % 5 === 0);
      setConfetti(newScore >= 5 && newScore % 5 === 0);
    } else {
      setScore(score - 1);
      setMessage(randomErrorMessage());
      setTimeout(() => {
        setMessage("");
      }, 1500);
      setConfetti(false);
    }
  };

  const toggleBit = (index: number) => {
    const newInputs = [...binaryInputs];
    newInputs[index] = !newInputs[index];
    setBinaryInputs(newInputs);
  };

  const calculateDecimal = () => {
    return binaryInputs.reduce(
      (sum, bit, index) => sum + (bit ? binaryValues[index] : 0),
      0
    );
  };

  const generateNewTarget = () => {
    setTarget(Math.floor(Math.random() * 256));
    setBinaryInputs([false, false, false, false, false, false, false, false]);
    setMessage("");
  };

  const guess = calculateDecimal();
  return (
    <>
      {confetti && (
        <ConfettiExplosion
          className="absolute top-0 translate-x-1/2 w-full h-full"
          particleCount={score * 10}
          duration={score + 2200}
          particleSize={score + 12}
        />
      )}
      <Card className="w-full max-w-lg relative">
        <div
          className={`absolute top-0 left-0 p-6 ${
            score < 0 && "text-destructive"
          }`}
        >
          Score: {score}
        </div>
        <div className="absolute top-0 right-0 p-6">
          <Button
            size={"sm"}
            variant={hint ? "default" : "outline"}
            className="px-2 py-0 h-auto"
            onClick={() => setHint(!hint)}
          >
            Help
          </Button>
        </div>
        <CardHeader>
          <h1 className="font-semibold text-xl text-center">Binary Helper</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`mb-4 text-center`}>
            <div className="text-xl font-bold">Target: {target}</div>
            <div className="text-base font-normal">
              Guess: {hint ? guess : <span className="text-gray-400">--</span>}
            </div>
          </div>
          <div className="grid grid-cols-8 border rounded h-24 divide-x">
            {binaryValues.map((value, index) => (
              <div key={index} className="grid grid-rows-2 pt-2 pb-6">
                <span className="text-sm text-center flex-centered">
                  {hint ? value : <span className="text-gray-400">--</span>}
                </span>
                <div className="relative flex-centered">
                  <Switch
                    checked={binaryInputs[index]}
                    onCheckedChange={() => toggleBit(index)}
                    className="data-[state=checked]:bg-green-500 rotate-[-90deg]"
                    aria-label={`Toggle bit ${value}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8 border rounded divide-x">
            <div className="flex-centered p-2">
              {binaryInputs[0] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[1] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[2] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[3] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[4] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[5] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[6] ? "1" : "0"}
            </div>
            <div className="flex-centered p-2">
              {binaryInputs[7] ? "1" : "0"}
            </div>
          </div>
          <h3 className="text-lg font-medium text-center h-4">
            {message || ""}
          </h3>

          <Button className="w-full" onClick={submit}>
            Submit Answer
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
