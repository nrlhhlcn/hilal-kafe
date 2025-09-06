import { Category, Customer } from '../types';

export const menuCategories: Category[] = [
  {
    id: 'pide',
    name: 'Pide',
    image: '/hilal-kafe/pide.png',
    items: [
      { id: 'pide-1', name: 'Karışık Pide', category: 'Pide', price: 85, image: '/hilal-kafe/pide/karisik.png' },
      { id: 'pide-2', name: 'Kuşbaşılı Pide', category: 'Pide', price: 95, image: '/hilal-kafe/pide/kusbasili.png' },
      { id: 'pide-3', name: 'Kavurmalı Pide', category: 'Pide', price: 100, image: '/hilal-kafe/pide/kavurmali.png' },
      { id: 'pide-4', name: 'Kıymalı Pide', category: 'Pide', price: 75, image: '/hilal-kafe/pide/kiymali.png' },
      { id: 'pide-5', name: 'Kaşarlı Sucuklu Pide', category: 'Pide', price: 90, image: '/hilal-kafe/pide/sucuk.png' },
      { id: 'pide-6', name: 'Kaşarlı Sebzeli Pide', category: 'Pide', price: 80, image: '/hilal-kafe/pide/sebzeli-kasarli.png' }
    ]
  },
  {
    id: 'kofte',
    name: 'Köfte',
    image: '/hilal-kafe/kofte.png',
    items: [
      { id: 'kofte-1', name: 'Köfte', category: 'Köfte', price: 120, image: '/hilal-kafe/kofte/kofte.png' },
      { id: 'kofte-2', name: 'Köfte + Tavuk', category: 'Köfte', price: 140, image: '/hilal-kafe/kofte/tavuk-kofte.png' }
    ]
  },
  {
    id: 'tavuk',
    name: 'Tavuk',
    image: '/hilal-kafe/tavuk.png',
    items: [
      { id: 'tavuk-1', name: 'Tavuk Şiş', category: 'Tavuk', price: 130, image: '/hilal-kafe/tavuk/tavuk-sis.png' },
      { id: 'tavuk-2', name: 'Kanat', category: 'Tavuk', price: 110, image: '/hilal-kafe/tavuk/kanat.png' },
      { id: 'tavuk-3', name: 'Pirzola', category: 'Tavuk', price: 150, image: '/hilal-kafe/tavuk/pirzola.png' }
    ]
  },
  {
    id: 'lahmacun',
    name: 'Lahmacun',
    image: '/hilal-kafe/lahmacun.png',
    items: [
      { id: 'lahmacun-1', name: 'Acılı Lahmacun', category: 'Lahmacun', price: 25, image: '/hilal-kafe/lahmacun/Acili-Lahmacun.png' },
      { id: 'lahmacun-2', name: 'Acısız Lahmacun', category: 'Lahmacun', price: 25, image: '/hilal-kafe/lahmacun/acisiz-lahmacun.png' }
    ]
  },
  {
    id: 'corba',
    name: 'Çorba',
    image: '/hilal-kafe/corba.png',
    items: [
      { id: 'corba-1', name: 'Mercimek Çorbası', category: 'Çorba', price: 30, image: '/hilal-kafe/corba/mercimek.png' },
      { id: 'corba-2', name: 'Yayla Çorbası', category: 'Çorba', price: 35, image: '/hilal-kafe/corba/yayla.png' }
    ]
  },
  {
    id: 'ev-yemegi',
    name: 'Ev Yemeği',
    image: '/hilal-kafe/evYemegi.png',
    items: [
      { id: 'ev-1', name: 'Kuru Fasulye', category: 'Ev Yemeği', price: 80, image: '/hilal-kafe/evYemekleri/kuru-fasulye.png' },
      { id: 'ev-2', name: 'Kuru Köfte', category: 'Ev Yemeği', price: 90, image: '/hilal-kafe/evYemekleri/kuru-kofte.png' },
      { id: 'ev-3', name: 'Mantar Sote', category: 'Ev Yemeği', price: 75, image: '/hilal-kafe/evYemekleri/mantar-sote.png' },
      { id: 'ev-4', name: 'Tavuk Sote', category: 'Ev Yemeği', price: 100, image: '/hilal-kafe/evYemekleri/takuk-sote.png' },
      { id: 'ev-5', name: 'Et Sote', category: 'Ev Yemeği', price: 120, image: '/hilal-kafe/evYemekleri/et-sote.png' }
    ]
  },
  {
    id: 'tatli',
    name: 'Tatlı',
    image: '/hilal-kafe/tatli.png',
    items: [
      { id: 'tatli-1', name: 'Sütlaç', category: 'Tatlı', price: 40, image: '/hilal-kafe/tatli/sutlac.png' },
      { id: 'tatli-2', name: 'Baklava', category: 'Tatlı', price: 45, image: '/hilal-kafe/baklava.png' }
    ]
  },
  {
    id: 'icecek',
    name: 'İçecek',
    image: '/hilal-kafe/icecek.png',
    items: [
      { id: 'icecek-1', name: 'Kola', category: 'İçecek', price: 15, image: '/hilal-kafe/icecekler/kola.png' },
      { id: 'icecek-2', name: 'Fanta', category: 'İçecek', price: 15, image: '/hilal-kafe/icecekler/fanta.png' },
      { id: 'icecek-3', name: 'Limonata', category: 'İçecek', price: 18, image: '/hilal-kafe/icecekler/limonata.png' },
      { id: 'icecek-4', name: 'Ayran', category: 'İçecek', price: 12, image: '/hilal-kafe/icecekler/ayran.png' },
      { id: 'icecek-5', name: 'Meyve Suyu', category: 'İçecek', price: 20, image: '/hilal-kafe/icecekler/meyvesuyu.png' },
      { id: 'icecek-6', name: 'Sade Soda', category: 'İçecek', price: 10, image: '/hilal-kafe/icecekler/sadeSoda.png' },
      { id: 'icecek-7', name: 'Limonlu Soda', category: 'İçecek', price: 12, image: '/hilal-kafe/icecekler/limonlu-soda.png' },
      { id: 'icecek-8', name: 'Su', category: 'İçecek', price: 5, image: '/hilal-kafe/icecekler/su.png' },
      { id: 'icecek-9', name: 'Şalgam', category: 'İçecek', price: 15, image: '/hilal-kafe/icecekler/salgam.png' }
    ]
  },
  {
    id: 'pogaca-borek',
    name: 'Poğaça & Börek',
    image: '/hilal-kafe/pogaca.png',
    items: [
      { id: 'pogaca-1', name: 'Su Böreği', category: 'Poğaça & Börek', price: 60, image: '/hilal-kafe/pogaca/su-boregi.png' },
      { id: 'pogaca-2', name: 'Kıymalı Poğaça', category: 'Poğaça & Börek', price: 25, image: '/hilal-kafe/pogaca/kiymali-pogaca.png' },
      { id: 'pogaca-3', name: 'Peynirli Poğaça', category: 'Poğaça & Börek', price: 20, image: '/hilal-kafe/pogaca/peynirli-pogaca.png' }
    ]
  }
];

export const initialCustomers: Customer[] = [
  { id: '1', name: 'İbrahim Çakır', weeklyTotal: 0, dailyOrders: [] },
  { id: '2', name: 'Hami Bey', weeklyTotal: 0, dailyOrders: [] },
  { id: '3', name: 'Gümrük', weeklyTotal: 0, dailyOrders: [] },
  { id: '4', name: 'Ofis', weeklyTotal: 0, dailyOrders: [] },
  { id: '5', name: 'Gata', weeklyTotal: 0, dailyOrders: [] },
  { id: '6', name: 'Finans', weeklyTotal: 0, dailyOrders: [] },
  { id: '7', name: 'Mobilyacılar', weeklyTotal: 0, dailyOrders: [] },
  { id: '8', name: 'Temizlikçiler', weeklyTotal: 0, dailyOrders: [] }
];