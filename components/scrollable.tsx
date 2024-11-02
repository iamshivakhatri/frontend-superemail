import React, { useState, useEffect, useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { format } from "date-fns";

interface TimePickerColumnProps {
  values: number[];
  selected: number;
  onChange: (value: number) => void;
  label: string;
}

interface ScrollableTimePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const TimePickerColumn: React.FC<TimePickerColumnProps> = ({ values, selected, onChange, label }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle mouse wheel scrolling with increased speed
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (scrollRef.current) {
      // Multiply deltaY by 3 for faster scrolling
      // Adjust this multiplier to change scroll speed (higher = faster)
      scrollRef.current.scrollTop += e.deltaY * 3;
      
      // Optional: Add smooth scrolling for smoother experience
      scrollRef.current.style.scrollBehavior = 'smooth';
      
      // Reset scroll behavior after scrolling
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = 'auto';
        }
      }, 50);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
      
      // Scroll to selected value
      const selectedElement = currentRef.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="relative w-16">
        {/* Highlight for selected item */}
        <div className="absolute w-full h-8 bg-blue-50 top-1/2 -translate-y-1/2 pointer-events-none border-y border-blue-100" />
        
        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          className="h-40 overflow-y-auto relative scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #EDF2F7',
            msOverflowStyle: '-ms-autohiding-scrollbar'
          }}
        >
          {/* Top padding */}
          <div className="h-16" />
          
          {/* Time values */}
          {values.map((value) => (
            <div
              key={value}
              data-selected={selected === value}
              className={`h-8 flex items-center justify-center cursor-pointer hover:bg-gray-50
                ${selected === value ? 'font-semibold text-blue-600' : 'text-gray-600'}
              `}
              onClick={() => onChange(value)}
            >
              {value.toString().padStart(2, '0')}
            </div>
          ))}
          
          {/* Bottom padding */}
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
};

const ScrollableTimePicker: React.FC<ScrollableTimePickerProps> = ({ value, onChange }) => {
  const [hours, setHours] = useState<number>(value ? value.getHours() % 12 || 12 : 12);
  const [minutes, setMinutes] = useState<number>(value ? value.getMinutes() : 0);
  const [isPM, setIsPM] = useState<boolean>(value ? value.getHours() >= 12 : false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hourValues = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteValues = Array.from({ length: 60 }, (_, i) => i);

  useEffect(() => {
    if (value) {
      setHours(value.getHours() % 12 || 12);
      setMinutes(value.getMinutes());
      setIsPM(value.getHours() >= 12);
    }
  }, [value]);

  const handleTimeChange = (newHours: number = hours, newMinutes: number = minutes, newIsPM: boolean = isPM) => {
    const date = new Date();
    let hour24 = newHours % 12;
    if (newIsPM) hour24 += 12;
    date.setHours(hour24);
    date.setMinutes(newMinutes);
    onChange(date);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="time">Time</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? (
              format(value, 'hh:mm a')
            ) : (
              <span className="text-muted-foreground">Pick a time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-4">
          <div className="flex space-x-6 items-start">
            <TimePickerColumn
              label="Hour"
              values={hourValues}
              selected={hours}
              onChange={(h) => {
                setHours(h);
                handleTimeChange(h, minutes, isPM);
              }}
            />

            <TimePickerColumn
              label="Minute"
              values={minuteValues}
              selected={minutes}
              onChange={(m) => {
                setMinutes(m);
                handleTimeChange(hours, m, isPM);
              }}
            />

            {/* AM/PM Toggle */}
            <div className="flex flex-col items-center pt-6">
              <div 
                className={`px-3 py-2 cursor-pointer rounded-t border-x border-t transition-colors
                  ${!isPM ? 'bg-blue-100 font-semibold border-blue-200' : 'hover:bg-gray-50 border-gray-200'}`}
                onClick={() => {
                  setIsPM(false);
                  handleTimeChange(hours, minutes, false);
                }}
              >
                AM
              </div>
              <div 
                className={`px-3 py-2 cursor-pointer rounded-b border transition-colors
                  ${isPM ? 'bg-blue-100 font-semibold border-blue-200' : 'hover:bg-gray-50 border-gray-200'}`}
                onClick={() => {
                  setIsPM(true);
                  handleTimeChange(hours, minutes, true);
                }}
              >
                PM
              </div>
            </div>
          </div>
          
          
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ScrollableTimePicker;