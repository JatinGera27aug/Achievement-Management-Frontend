import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

type EventType = 
  | 'technical' 
  | 'cultural' 
  | 'debate' 
  | 'speech' 
  | 'volunteer' 
  | 'meetup' 
  | 'other';

type ResultType = 'won' | 'runner-up' | 'participated';

const EventForm: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOffline, setIsOffline] = useState(true);
  const [eventType, setEventType] = useState<EventType>('technical');
  const [customEventType, setCustomEventType] = useState('');
  const [result, setResult] = useState<ResultType>('participated');
  const [runnerUpPosition, setRunnerUpPosition] = useState('');

  const handleNextStep = () => {
    // Validation checks
    const errors: string[] = [];

    if (!eventName.trim()) errors.push("Event Name is required");
    if (!date) errors.push("Event Date is required");
    if (eventType === 'other' && !customEventType.trim()) 
      errors.push("Custom Event Type is required");
    if (result === 'runner-up' && !runnerUpPosition.trim()) 
      errors.push("Runner Up Position is required");

    if (errors.length > 0) {
      // Display all errors
      errors.forEach(error => 
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive"
        })
      );
      return;
    }

    // Proceed to next step
    console.log("Form Data:", {
      eventName,
      date,
      isOffline,
      eventType: eventType === 'other' ? customEventType : eventType,
      result,
      runnerUpPosition
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ 
          minHeight: '80vh', 
          maxHeight: '120vh',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-center text-3xl font-bold mb-10 text-gray-800 tracking-tight"
          variants={itemVariants}
        >
          Add Event Details
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 flex-grow">
          {/* Event Name */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <Label className="mb-2 text-lg">Event Name</Label>
            <Input 
              placeholder="Enter event name" 
              className="h-12 text-base"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </motion.div>

          {/* Event Date */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <Label className="mb-2 text-lg">Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-12 w-full justify-between text-base"
                >
                  {date ? format(date, "PPP") : "Select Date"}
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Event Type and Mode */}
          <motion.div variants={itemVariants} className="flex flex-col sm:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start mb">
              {/* Event Type */}
              <div>
                <Label className="mb-2 text-lg">Event Type</Label>
                <Select 
                  value={eventType}
                  onValueChange={(value: EventType) => {
                    setEventType(value);
                    setCustomEventType('');
                  }}
                >
                  <SelectTrigger className="h-12 text-base mt-3">
                    <SelectValue placeholder="Select Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(['technical', 'cultural', 'debate', 'speech', 'volunteer', 'meetup', 'other'] as EventType[]).map((type) => (
                      <SelectItem key={type} value={type} className="text-base">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Event Type */}
          {eventType === 'other' && (
            <motion.div variants={itemVariants} className="flex flex-col sm:col-span-2">
              <Label className="mb-2 text-lg">Custom Event Type</Label>
              <Input 
                placeholder="Enter your custom event type" 
                className="h-12 text-base"
                value={customEventType}
                onChange={(e) => setCustomEventType(e.target.value)}
              />
            </motion.div>
          )}

              {/* Event Mode */}
              <div className="flex flex-col items-start">
                <Label className="mb-2 text-lg ml-0 lg:ml-2">Event Mode</Label>
                <div className="flex items-center gap-4 mt-0 ml-0 lg:ml-2 lg:mt-3">
                  <span className={!isOffline ? "text-green-600 font-bold" : ""}>Online</span>
                  <Switch 
                    checked={isOffline} 
                    onCheckedChange={setIsOffline} 
                    className={isOffline ? "bg-blue-500 data-[state=checked]:bg-blue-500" 
                      : "bg-blue-500 data-[state=unchecked]:bg-blue-500"}
                  />
                  <span className={isOffline ? "text-green-600 font-bold" : ""}>Offline</span>
                </div>
              </div>
            </div>
          </motion.div>

          

          {/* Result Section */}
          <motion.div variants={itemVariants} className="flex flex-col sm:col-span-2">
            <Label className="mb-2 text-lg">Result</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Select 
                value={result}
                onValueChange={(value: ResultType) => setResult(value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select Result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="runner-up">Runner Up</SelectItem>
                  <SelectItem value="participated">Participated</SelectItem>
                  <SelectItem value="conducted">Conducted</SelectItem>
                </SelectContent>
              </Select>

              {result === 'runner-up' && (
                <Input 
                  placeholder="Position (1st Runner-up, 2nd..., 3rd...)" 
                  className="h-12 text-base"
                  value={runnerUpPosition}
                  onChange={(e) => setRunnerUpPosition(e.target.value)}
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div 
          className="flex justify-end mt-6"
          variants={itemVariants}
        >
          <Button 
            className="px-8 py-3 text-xl font-semibold bg-blue-800 hover:bg-blue-600"
            onClick={handleNextStep}
          >
            Next Step →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventForm;
