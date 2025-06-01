import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Car, Clock, Armchair as Wheelchair, BatteryCharging } from 'lucide-react';
import { ParkingSpot, ParkingStatus } from '../types';

const mockParkingSpots: ParkingSpot[] = Array.from({ length: 20 }, (_, i) => ({
  id: `spot-${i + 1}`,
  number: `${i + 1}`,
  section: `Zone ${Math.floor(i / 5) + 1}`,
  type: i < 2 ? 'handicap' : i < 4 ? 'electric' : 'standard',
  status: Math.random() > 0.7 ? 'reserved' : Math.random() > 0.8 ? 'occupied' : 'available'
}));

export default function ParkingReservation() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const statusColors: Record<ParkingStatus, string> = {
    available: 'bg-success-500',
    reserved: 'bg-warning-500',
    occupied: 'bg-error-500'
  };

  const handleReservation = () => {
    if (!selectedSpot || !startTime || !endTime || !vehicleNumber) {
      alert('Please fill in all fields');
      return;
    }
    // Handle reservation logic
    console.log('Reserving parking:', { selectedSpot, startTime, endTime, vehicleNumber });
  };

  const SpotIcon = ({ type }: { type: ParkingSpot['type'] }) => {
    switch (type) {
      case 'handicap':
        return <Wheelchair className="h-6 w-6" />;
      case 'electric':
        return <BatteryCharging className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Parking Reservation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <Card.Title>Available Parking Spots</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-4 gap-4">
                {mockParkingSpots.map((spot) => (
                  <button
                    key={spot.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      spot.status === 'available'
                        ? 'border-success-500 hover:bg-success-50'
                        : spot.status === 'reserved'
                        ? 'border-warning-500 bg-warning-50'
                        : 'border-error-500 bg-error-50'
                    } ${
                      selectedSpot?.id === spot.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => spot.status === 'available' && setSelectedSpot(spot)}
                    disabled={spot.status !== 'available'}
                  >
                    <div className="flex flex-col items-center">
                      <SpotIcon type={spot.type} />
                      <span className="mt-2 font-medium">Spot {spot.number}</span>
                      <span className="text-xs text-gray-500">{spot.section}</span>
                      <Badge
                        variant={spot.type === 'handicap' ? 'primary' : spot.type === 'electric' ? 'secondary' : 'default'}
                        size="sm"
                        className="mt-2"
                      >
                        {spot.type}
                      </Badge>
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
              {selectedSpot ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Spot
                    </label>
                    <div className="flex items-center space-x-2">
                      <SpotIcon type={selectedSpot.type} />
                      <span>Spot {selectedSpot.number}</span>
                      <Badge variant="default" size="sm">{selectedSpot.section}</Badge>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      placeholder="Enter vehicle number"
                    />
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

                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleReservation}
                  >
                    Reserve Parking
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-gray-300 mx-auto" />
                  <p className="mt-2 text-gray-500">
                    Select an available parking spot to make a reservation
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
                {mockParkingSpots
                  .filter(spot => spot.status === 'reserved')
                  .slice(0, 3)
                  .map(spot => (
                    <div
                      key={spot.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <SpotIcon type={spot.type} />
                        <div>
                          <p className="font-medium">Spot {spot.number}</p>
                          <p className="text-sm text-gray-500">{spot.section}</p>
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