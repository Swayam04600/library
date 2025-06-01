import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArmchairIcon as ChairIcon, Clock, User } from 'lucide-react';
import { Seat, SeatStatus } from '../types';

const mockSeats: Seat[] = Array.from({ length: 30 }, (_, i) => ({
  id: `seat-${i + 1}`,
  number: `${i + 1}`,
  section: `Section ${Math.floor(i / 10) + 1}`,
  status: Math.random() > 0.7 ? 'reserved' : Math.random() > 0.8 ? 'occupied' : 'available'
}));

export default function SeatReservation() {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');

  const statusColors: Record<SeatStatus, string> = {
    available: 'bg-success-500',
    reserved: 'bg-warning-500',
    occupied: 'bg-error-500'
  };

  const handleReservation = () => {
    if (!selectedSeat || !startTime || !endTime || !purpose) {
      alert('Please fill in all fields');
      return;
    }
    // Handle reservation logic
    console.log('Reserving seat:', { selectedSeat, startTime, endTime, purpose });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Seat Reservation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <Card.Title>Available Seats</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-5 gap-4">
                {mockSeats.map((seat) => (
                  <button
                    key={seat.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      seat.status === 'available'
                        ? 'border-success-500 hover:bg-success-50'
                        : seat.status === 'reserved'
                        ? 'border-warning-500 bg-warning-50'
                        : 'border-error-500 bg-error-50'
                    } ${
                      selectedSeat?.id === seat.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => seat.status === 'available' && setSelectedSeat(seat)}
                    disabled={seat.status !== 'available'}
                  >
                    <div className="flex flex-col items-center">
                      <ChairIcon className={`h-8 w-8 ${
                        seat.status === 'available'
                          ? 'text-success-500'
                          : seat.status === 'reserved'
                          ? 'text-warning-500'
                          : 'text-error-500'
                      }`} />
                      <span className="mt-2 font-medium">{seat.number}</span>
                      <span className="text-xs text-gray-500">{seat.section}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center space-x-8">
                {Object.entries(statusColors).map(([status, color]) => (
                  <div key={status} className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${color} mr-2`} />
                    <span className="text-sm capitalize">{status}</span>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <Card.Title>Reservation Details</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              {selectedSeat ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Seat
                    </label>
                    <div className="flex items-center space-x-2">
                      <ChairIcon className="h-5 w-5 text-primary-500" />
                      <span>Seat {selectedSeat.number}</span>
                      <Badge variant="default" size="sm">{selectedSeat.section}</Badge>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purpose
                    </label>
                    <textarea
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      rows={3}
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="Study, Research, etc."
                    />
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleReservation}
                  >
                    Reserve Seat
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <ChairIcon className="h-12 w-12 text-gray-300 mx-auto" />
                  <p className="mt-2 text-gray-500">
                    Select an available seat to make a reservation
                  </p>
                </div>
              )}
            </Card.Content>
          </Card>

          <Card className="mt-6">
            <Card.Header>
              <Card.Title>Current Reservations</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {mockSeats
                  .filter(seat => seat.status === 'reserved')
                  .slice(0, 3)
                  .map(seat => (
                    <div
                      key={seat.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <ChairIcon className="h-5 w-5 text-warning-500" />
                        <div>
                          <p className="font-medium">Seat {seat.number}</p>
                          <p className="text-sm text-gray-500">{seat.section}</p>
                        </div>
                      </div>
                      <Badge variant="warning" size="sm">Reserved</Badge>
                    </div>
                  ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}