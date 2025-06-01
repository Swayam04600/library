import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UserPlus, Mail, Phone, MapPin, Calendar, Briefcase, Car as IdCard, Heart } from 'lucide-react';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  birthdate: z.string(),
  occupation: z.string().min(2, 'Occupation must be at least 2 characters'),
  membershipType: z.enum(['standard', 'student', 'senior']),
  idProof: z.string().min(2, 'ID proof is required'),
  emergencyContact: z.object({
    name: z.string().min(2, 'Emergency contact name is required'),
    phone: z.string().min(10, 'Emergency contact phone is required'),
    relationship: z.string().min(2, 'Relationship is required'),
  }),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationForm) => {
    try {
      // Handle form submission
      console.log('Form data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Library Membership Registration</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <Card.Title>Personal Information</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-error-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-error-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-error-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-error-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-xs text-error-500">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      {...register('birthdate')}
                      className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                    />
                  </div>
                  {errors.birthdate && (
                    <p className="mt-1 text-xs text-error-500">{errors.birthdate.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      {...register('occupation')}
                      className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                    />
                  </div>
                  {errors.occupation && (
                    <p className="mt-1 text-xs text-error-500">{errors.occupation.message}</p>
                  )}
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Membership Details</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Membership Type
                </label>
                <select
                  {...register('membershipType')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="standard">Standard</option>
                  <option value="student">Student</option>
                  <option value="senior">Senior Citizen</option>
                </select>
                {errors.membershipType && (
                  <p className="mt-1 text-xs text-error-500">{errors.membershipType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Proof Number
                </label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    {...register('idProof')}
                    className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                    placeholder="Driver's License/Passport/ID Card"
                  />
                </div>
                {errors.idProof && (
                  <p className="mt-1 text-xs text-error-500">{errors.idProof.message}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Emergency Contact</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('emergencyContact.name')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    {errors.emergencyContact?.name && (
                      <p className="mt-1 text-xs text-error-500">{errors.emergencyContact.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('emergencyContact.phone')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    {errors.emergencyContact?.phone && (
                      <p className="mt-1 text-xs text-error-500">{errors.emergencyContact.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        {...register('emergencyContact.relationship')}
                        className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm"
                      />
                    </div>
                    {errors.emergencyContact?.relationship && (
                      <p className="mt-1 text-xs text-error-500">{errors.emergencyContact.relationship.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card.Content>
            <Card.Footer>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                leftIcon={<UserPlus size={18} />}
                isLoading={isSubmitting}
              >
                Submit Registration
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </form>
    </div>
  );
}