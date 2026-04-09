
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { ShieldCheck, CheckCircle2, AlertCircle, ClipboardCheck, ArrowRight } from 'lucide-react';

const Safety = () => {
  const { t } = useTranslation();

  const generalItems = t('safety.general.items', { returnObjects: true }) as Array<{
    title: string;
    timing: string;
    method: string;
    problem: string;
  }>;
  const group1Checks = t('safety.critical.group1.checks', { returnObjects: true }) as string[];
  const group2Checks = t('safety.critical.group2.checks', { returnObjects: true }) as string[];
  const group3Checks = t('safety.critical.group3.checks', { returnObjects: true }) as string[];

  return (
    <section id="safety" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg relative overflow-hidden">
      {/* Background decorations for Light Theme */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-trend-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedElement animation="fadeInUp">
          <div className="text-center mb-12 xl:mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-white shadow-xl rounded-full mb-6 relative group transform hover:scale-105 transition-all duration-500">
              <ShieldCheck className="w-10 h-10 xl:w-12 xl:h-12 text-trend-accent relative z-10" />
              <div className="absolute inset-0 bg-trend-accent/10 rounded-full animate-ping opacity-50" />
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-trend-text mb-4 font-noto tracking-tight">
              {t('safety.title')}
            </h2>
            <p className="text-trend-text/70 text-lg md:text-xl font-noto max-w-2xl mx-auto leading-relaxed">
              {t('safety.subtitle')}
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fadeInUp" delay={200}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="flex w-full md:w-3/4 mx-auto grid-cols-2 mb-10 bg-white/60 backdrop-blur-md p-1.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/80">
              <TabsTrigger 
                value="general" 
                className="w-full rounded-xl data-[state=active]:bg-trend-accent data-[state=active]:text-white data-[state=active]:shadow-lg text-trend-text/70 hover:text-trend-accent transition-all font-noto text-sm md:text-base py-3"
              >
                {t('safety.tabs.general')}
              </TabsTrigger>
              <TabsTrigger 
                value="critical" 
                className="w-full rounded-xl data-[state=active]:bg-trend-accent data-[state=active]:text-white data-[state=active]:shadow-lg text-trend-text/70 hover:text-trend-accent transition-all font-noto text-sm md:text-base py-3"
              >
                {t('safety.tabs.critical')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="focus-visible:outline-none focus-visible:ring-0 mt-0 animate-in fade-in zoom-in-95 duration-500">
              <Card className="border-none bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-trend-accent/80 to-trend-accent" />
                <CardContent className="p-6 md:p-10 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-trend-text mb-8 flex items-center justify-center md:justify-start gap-3 font-noto">
                    <ClipboardCheck className="w-7 h-7 md:w-8 md:h-8 text-trend-accent" />
                    {t('safety.general.title')}
                  </h3>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {Array.isArray(generalItems) && generalItems.map((item, idx) => (
                      <AccordionItem key={idx} value={`gen-item-${idx}`} className="border border-black/5 bg-white rounded-2xl px-4 py-2 hover:shadow-md transition-all duration-300 data-[state=open]:border-trend-accent/30 data-[state=open]:shadow-lg">
                        <AccordionTrigger className="text-trend-text hover:text-trend-accent text-left font-noto text-lg md:text-xl py-4 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-trend-accent/10 flex items-center justify-center text-trend-accent shadow-inner">
                              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                            </span>
                            <span>{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-4">
                            <div className="bg-trend-bg p-5 rounded-xl border border-black/5 flex flex-col gap-4">
                              <div>
                                <p className="text-xs md:text-sm text-trend-text/60 font-bold font-noto tracking-wider mb-1 flex items-center gap-1.5">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                  いつ / TIMING
                                </p>
                                <p className="text-trend-text font-noto text-sm md:text-base leading-relaxed pl-5">
                                  {item.timing}
                                </p>
                              </div>
                              <div className="w-full h-px bg-black/5" />
                              <div>
                                <p className="text-xs md:text-sm text-trend-text/60 font-bold font-noto tracking-wider mb-1 flex items-center gap-1.5">
                                  <ClipboardCheck className="w-3.5 h-3.5" />
                                  どのように / METHOD
                                </p>
                                <p className="text-trend-text font-noto text-sm md:text-base leading-relaxed pl-5">
                                  {item.method}
                                </p>
                              </div>
                              <div className="w-full h-px bg-black/5" />
                              <div>
                                <p className="text-xs md:text-sm text-trend-accent font-bold font-noto tracking-wider mb-1 flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  問題があったとき / IF PROBLEM OCCURS
                                </p>
                                <p className="text-trend-text font-noto text-sm md:text-base leading-relaxed pl-5">
                                  {item.problem}
                                </p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="critical" className="focus-visible:outline-none focus-visible:ring-0 mt-0 animate-in fade-in zoom-in-95 duration-500">
              <Card className="border-none bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-trend-accent to-trend-accent/80" />
                <CardContent className="p-6 md:p-10 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-trend-text mb-8 flex items-center justify-center md:justify-start gap-3 font-noto">
                    <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-trend-accent" />
                    {t('safety.critical.title')}
                  </h3>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {/* Group 1 */}
                    <AccordionItem value="item-1" className="border border-black/5 bg-white rounded-2xl px-4 py-2 hover:shadow-md transition-all duration-300 data-[state=open]:border-trend-accent/30 data-[state=open]:shadow-lg">
                      <AccordionTrigger className="text-trend-text hover:text-trend-accent text-left font-noto text-lg md:text-xl py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="bg-trend-accent/10 text-trend-accent px-3 py-1 text-sm font-bold rounded-lg whitespace-nowrap">Group 1</span>
                          <span>{t('safety.critical.group1.title').replace('第1グループ（', '').replace('）', '')}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-4">
                          <div className="bg-trend-bg p-5 rounded-xl border border-black/5">
                            <p className="text-sm md:text-base text-trend-text/70 mb-4 font-semibold font-noto flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-trend-accent" />
                              {t('safety.critical.group1.targets')}
                            </p>
                            <ul className="space-y-3 pl-2">
                              {Array.isArray(group1Checks) && group1Checks.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-trend-text font-noto">
                                  <div className="w-1.5 h-1.5 rounded-full bg-trend-accent mt-2 flex-shrink-0" />
                                  <span className="leading-relaxed hover:text-trend-accent transition-colors">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Group 2 */}
                    <AccordionItem value="item-2" className="border border-black/5 bg-white rounded-2xl px-4 py-2 hover:shadow-md transition-all duration-300 data-[state=open]:border-trend-accent/30 data-[state=open]:shadow-lg">
                      <AccordionTrigger className="text-trend-text hover:text-trend-accent text-left font-noto text-lg md:text-xl py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="bg-trend-accent/10 text-trend-accent px-3 py-1 text-sm font-bold rounded-lg whitespace-nowrap">Group 2</span>
                          <span>{t('safety.critical.group2.title').replace('第2グループ（', '').replace('）', '')}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-4">
                          <div className="bg-trend-bg p-5 rounded-xl border border-black/5">
                            <p className="text-sm md:text-base text-trend-text/70 mb-4 font-semibold font-noto flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-trend-accent" />
                              {t('safety.critical.group2.targets')}
                            </p>
                            <ul className="space-y-3 pl-2">
                              {Array.isArray(group2Checks) && group2Checks.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-trend-text font-noto">
                                  <div className="w-1.5 h-1.5 rounded-full bg-trend-accent mt-2 flex-shrink-0" />
                                  <span className="leading-relaxed hover:text-trend-accent transition-colors">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Group 3 */}
                    <AccordionItem value="item-3" className="border border-black/5 bg-white rounded-2xl px-4 py-2 hover:shadow-md transition-all duration-300 data-[state=open]:border-trend-accent/30 data-[state=open]:shadow-lg">
                      <AccordionTrigger className="text-trend-text hover:text-trend-accent text-left font-noto text-lg md:text-xl py-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="bg-trend-accent/10 text-trend-accent px-3 py-1 text-sm font-bold rounded-lg whitespace-nowrap">Group 3</span>
                          <span>{t('safety.critical.group3.title').replace('第3グループ（', '').replace('）', '')}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-4">
                          <div className="bg-trend-bg p-5 rounded-xl border border-black/5">
                            <p className="text-sm md:text-base text-trend-text/70 mb-4 font-semibold font-noto flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-trend-accent" />
                              {t('safety.critical.group3.targets')}
                            </p>
                            <ul className="space-y-3 pl-2">
                              {Array.isArray(group3Checks) && group3Checks.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-trend-text font-noto">
                                  <div className="w-1.5 h-1.5 rounded-full bg-trend-accent mt-2 flex-shrink-0" />
                                  <span className="leading-relaxed hover:text-trend-accent transition-colors">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Safety;
