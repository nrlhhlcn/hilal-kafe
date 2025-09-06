import { Category, Customer } from '../types';

// Environment-based base path
const basePath = import.meta.env.PROD ? '/hilal-kafe' : '';

export const menuCategories: Category[] = [
  {
    id: 'pide',
    name: 'Pide',
    image: basePath + '/pide.png',
    items: [
      { id: 'pide-1', name: 'Karışık Pide', category: 'Pide', price: 85, image: basePath + '/pide/karisik.png' },
      { id: 'pide-2', name: 'Kuşbaşılı Pide', category: 'Pide', price: 95, image: basePath + '/pide/kusbasili.png' },
      { id: 'pide-3', name: 'Kavurmalı Pide', category: 'Pide', price: 100, image: basePath + '/pide/kavurmali.png' },
      { id: 'pide-4', name: 'Kıymalı Pide', category: 'Pide', price: 75, image: basePath + '/pide/kiymali.png' },
      { id: 'pide-5', name: 'Kaşarlı Sucuklu Pide', category: 'Pide', price: 90, image: basePath + '/pide/sucuk.png' },
      { id: 'pide-6', name: 'Kaşarlı Sebzeli Pide', category: 'Pide', price: 80, image: basePath + '/pide/sebzeli-kasarli.png' }
    ]
  },
  {
    id: 'kofte',
    name: 'Köfte',
    image: basePath + '/kofte.png',
    items: [
      { id: 'kofte-1', name: 'Köfte', category: 'Köfte', price: 120, image: basePath + '/kofte/kofte.png' },
      { id: 'kofte-2', name: 'Köfte + Tavuk', category: 'Köfte', price: 140, image: basePath + '/kofte/tavuk-kofte.png' }
    ]
  },
  {
    id: 'tavuk',
    name: 'Tavuk',
    image: basePath + '/tavuk.png',
    items: [
      { id: 'tavuk-1', name: 'Tavuk Şiş', category: 'Tavuk', price: 130, image: basePath + '/tavuk/tavuk-sis.png' },
      { id: 'tavuk-2', name: 'Kanat', category: 'Tavuk', price: 110, image: basePath + '/tavuk/kanat.png' },
      { id: 'tavuk-3', name: 'Pirzola', category: 'Tavuk', price: 150, image: basePath + '/tavuk/pirzola.png' }
    ]
  },
  {
    id: 'lahmacun',
    name: 'Lahmacun',
    image: basePath + '/lahmacun.png',
    items: [
      { id: 'lahmacun-1', name: 'Acılı Lahmacun', category: 'Lahmacun', price: 25, image: basePath + '/lahmacun/Acili-Lahmacun.png' },
      { id: 'lahmacun-2', name: 'Acısız Lahmacun', category: 'Lahmacun', price: 25, image: basePath + '/lahmacun/acisiz-lahmacun.png' }
    ]
  },
  {
    id: 'corba',
    name: 'Çorba',
    image: basePath + '/corba.png',
    items: [
      { id: 'corba-1', name: 'Mercimek Çorbası', category: 'Çorba', price: 30, image: basePath + '/corba/mercimek.png' },
      { id: 'corba-2', name: 'Yayla Çorbası', category: 'Çorba', price: 35, image: basePath + '/corba/yayla.png' }
    ]
  },
  {
    id: 'ev-yemegi',
    name: 'Ev Yemeği',
    image: basePath + '/evYemegi.png',
    items: [
      { id: 'ev-1', name: 'Kuru Fasulye', category: 'Ev Yemeği', price: 80, image: basePath + '/evYemekleri/kuru-fasulye.png' },
      { id: 'ev-2', name: 'Kuru Köfte', category: 'Ev Yemeği', price: 90, image: basePath + '/evYemekleri/kuru-kofte.png' },
      { id: 'ev-3', name: 'Mantar Sote', category: 'Ev Yemeği', price: 75, image: basePath + '/evYemekleri/mantar-sote.png' },
      { id: 'ev-4', name: 'Tavuk Sote', category: 'Ev Yemeği', price: 100, image: basePath + '/evYemekleri/takuk-sote.png' },
      { id: 'ev-5', name: 'Et Sote', category: 'Ev Yemeği', price: 120, image: basePath + '/evYemekleri/et-sote.png' }
    ]
  },
  {
    id: 'tatli',
    name: 'Tatlı',
    image: basePath + '/tatli.png',
    items: [
      { id: 'tatli-1', name: 'Sütlaç', category: 'Tatlı', price: 40, image: basePath + '/tatli/sutlac.png' },
      { id: 'tatli-2', name: 'Baklava', category: 'Tatlı', price: 45, image: basePath + '/baklava.png' }
    ]
  },
  {
    id: 'icecek',
    name: 'İçecek',
    image: basePath + '/icecek.png',
    items: [
      { id: 'icecek-1', name: 'Kola', category: 'İçecek', price: 15, image: basePath + '/icecekler/kola.png' },
      { id: 'icecek-2', name: 'Fanta', category: 'İçecek', price: 15, image: basePath + '/icecekler/fanta.png' },
      { id: 'icecek-3', name: 'Limonata', category: 'İçecek', price: 18, image: basePath + '/icecekler/limonata.png' },
      { id: 'icecek-4', name: 'Ayran', category: 'İçecek', price: 12, image: basePath + '/icecekler/ayran.png' },
      { id: 'icecek-5', name: 'Meyve Suyu', category: 'İçecek', price: 20, image: basePath + '/icecekler/meyvesuyu.png' },
      { id: 'icecek-6', name: 'Sade Soda', category: 'İçecek', price: 10, image: basePath + '/icecekler/sadeSoda.png' },
      { id: 'icecek-7', name: 'Limonlu Soda', category: 'İçecek', price: 12, image: basePath + '/icecekler/limonlu-soda.png' },
      { id: 'icecek-8', name: 'Su', category: 'İçecek', price: 5, image: basePath + '/icecekler/su.png' },
      { id: 'icecek-9', name: 'Şalgam', category: 'İçecek', price: 15, image: basePath + '/icecekler/salgam.png' }
    ]
  },
  {
    id: 'pogaca-borek',
    name: 'Poğaça & Börek',
    image: basePath + '/pogaca.png',
    items: [
      { id: 'pogaca-1', name: 'Su Böreği', category: 'Poğaça & Börek', price: 60, image: basePath + '/pogaca/su-boregi.png' },
      { id: 'pogaca-2', name: 'Kıymalı Poğaça', category: 'Poğaça & Börek', price: 25, image: basePath + '/pogaca/kiymali-pogaca.png' },
      { id: 'pogaca-3', name: 'Peynirli Poğaça', category: 'Poğaça & Börek', price: 20, image: basePath + '/pogaca/peynirli-pogaca.png' }
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