import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, loading }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-600 dark:text-gray-400">
          No events found
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;