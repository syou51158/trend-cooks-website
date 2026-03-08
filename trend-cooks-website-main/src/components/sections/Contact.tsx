import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// NEW: locale-aware date picker imports
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';
import { ja as jaLocale, enUS } from 'date-fns/locale';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    menu: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Derived values for locale-aware date display (must be inside component)
  const localeObj = i18n.language?.startsWith('en') ? enUS : jaLocale;
  const selectedDate = formData.date ? new Date(formData.date + 'T00:00:00') : undefined;
  const dateDisplay = selectedDate
    ? format(
        selectedDate,
        i18n.language?.startsWith('en') ? 'MMM d, yyyy' : 'yyyy/MM/dd',
        { locale: localeObj }
      )
    : '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // 簡易バリデーション
    if (!formData.name || !formData.email) {
      setSubmitMessage(t('contact.validationRequired'));
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      setSubmitMessage(t('contact.thanks'));
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        menu: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 xl:py-24 2xl:py-32 bg-white">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            {t('contact.title')}
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl xl:text-3xl 2xl:text-4xl font-noto text-trend-text">
                {t('contact.formTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="xl:p-8 2xl:p-10">
              <form onSubmit={handleSubmit} className="space-y-6" aria-label={t('contact.formAria')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-noto">{t('contact.labels.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-noto">{t('contact.labels.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="font-noto">{t('contact.labels.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="font-noto">{t('contact.labels.date')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Input
                          id="date"
                          name="date"
                          type="text"
                          value={dateDisplay}
                          readOnly
                          required
                          placeholder={i18n.language?.startsWith('en') ? 'Select date' : '日付を選択'}
                          className="mt-1 cursor-pointer"
                        />
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={(d) => {
                            const iso = d ? format(d, 'yyyy-MM-dd') : '';
                            setFormData((prev) => ({ ...prev, date: iso }));
                          }}
                          locale={localeObj}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time" className="font-noto">{t('contact.labels.time')}</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      lang={i18n.language}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests" className="font-noto">{t('contact.labels.guests')}</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="menu" className="font-noto">{t('contact.labels.menu')}</Label>
                  <Input
                    id="menu"
                    name="menu"
                    value={formData.menu}
                    onChange={handleInputChange}
                    placeholder={t('contact.placeholders.menu')}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-noto">{t('contact.labels.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={t('contact.placeholders.message')}
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-trend-accent hover:bg-trend-accent/90 text-white xl:text-lg 2xl:text-xl xl:py-3 2xl:py-4 font-noto"
                >
                  {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                  <Send className="ml-2" size={16} />
                </Button>

                {submitMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-noto">{submitMessage}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 xl:space-y-12 2xl:space-y-16">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl xl:text-3xl 2xl:text-4xl font-noto text-trend-text">
                  {t('contact.storeInfoTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 xl:space-y-8 2xl:space-y-10 xl:p-8 2xl:p-10">
                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <MapPin className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">{t('contact.addressTitle')}</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                      {t('common.address.zip')}<br />
                      {t('common.address.line1')}<br />
                      {t('common.address.line2')}
                    </p>
                    <p className="text-sm xl:text-base 2xl:text-lg text-gray-500 font-noto mt-1">
                      {t('common.address.accessNote')}<br />
                      {t('common.address.parkingNote')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <Phone className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">{t('contact.phoneReservationTitle')}</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">{t('common.phone')}</p>
                    <p className="text-sm xl:text-base 2xl:text-lg text-gray-500 font-noto">{t('common.owner')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <Clock className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">{t('common.hours.title')}</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                      {t('common.hours.day')}<br />
                      {t('common.hours.night')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <Mail className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">{t('contact.shuttleTitle')}</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">{t('contact.shuttleText')}<br />
                      <span className="text-sm xl:text-base 2xl:text-lg text-gray-500">{t('contact.shuttleNote')}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 2xl:p-8">
                  <p className="text-gray-500 xl:text-lg 2xl:text-xl font-noto">{t('contact.mapPlaceholder')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
