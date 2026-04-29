import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const COLORS = {
  bg: '#f6f7fb',
  card: '#ffffff',
  primary: '#2f63ff',
  text: '#0f172a',
  muted: '#6b7280',
  border: '#e8eaf1',
  green: '#12b981',
  danger: '#e11d48',
};

const announcements = [
  {
    id: '1',
    title: 'Asansör Bakımı',
    date: 'Bugün, 10:00',
    text: 'A Blok asansörleri 13:00-15:00 arası aylık periyodik bakıma alınacaktır.',
    badge: 'YENI',
  },
  {
    id: '2',
    title: 'Genel Kurul Toplantısı',
    date: 'Dün, 14:30',
    text: "Yıllık olağan genel kurul toplantısı 20 Nisan Cumartesi günü saat 14:00'te yapılacaktır.",
  },
  {
    id: '3',
    title: 'Su Kesintisi Uyarısı',
    date: '25 Mart 2026',
    text: 'ISKI tarafından yapılan duyuruya göre yarın 10:00-14:00 saatleri arasında su kesintisi olacaktır.',
  },
  {
    id: '4',
    title: 'Bahar Temizliği',
    date: '20 Mart 2026',
    text: 'Hafta sonu ortak alanlarda ve bahçede genel bahar temizliği yapılacaktır.',
  },
];

const payments = [
  { id: '1', title: 'Mart 2026 Aidatı', date: '12.03.2026', amount: '1.250 ₺' },
  { id: '2', title: 'Subat 2026 Aidatı', date: '14.02.2026', amount: '1.100 ₺' },
  { id: '3', title: 'Ocak 2026 Aidatı', date: '10.01.2026', amount: '1.100 ₺' },
  { id: '4', title: 'Aralık 2025 Aidatı', date: '15.12.2025', amount: '1.100 ₺' },
  { id: '5', title: 'Ek Butce (Catı Tamiri)', date: '05.12.2025', amount: '500 ₺' },
];

function ScreenContainer({ children }) {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.fakeStatus}>
        <Text style={styles.statusTime}>9:41</Text>
        <Text style={styles.statusDots}>● ● ●</Text>
      </View>
      {children}
    </SafeAreaView>
  );
}

function LoginScreen({ role, setRole, onLogin }) {
  return (
    <ScreenContainer>
      <View style={styles.loginContent}>
        <Image source={require('./assets/ee.png')} style={styles.brandImage} resizeMode="contain" />
        <Text style={styles.appSubtitle}>Yönetim ve Iletisim Platformu</Text>

        <View style={styles.roleSwitch}>
          <Pressable style={[styles.roleBtn, role === 'resident' && styles.roleBtnActive]} onPress={() => setRole('resident')}>
            <Text style={[styles.roleText, role === 'resident' && styles.roleTextActive]}>Sakin Girisi</Text>
          </Pressable>
          <Pressable style={[styles.roleBtn, role === 'manager' && styles.roleBtnActive]} onPress={() => setRole('manager')}>
            <Text style={[styles.roleText, role === 'manager' && styles.roleTextActive]}>Yönetici Girisi</Text>
          </Pressable>
        </View>

        <Text style={styles.inputLabel}>Telefon Numarası</Text>
        <TextInput style={styles.input} placeholder="05XX XXX XX XX" placeholderTextColor="#94a3b8" />
        <Text style={styles.inputLabel}>Sifre</Text>
        <TextInput style={styles.input} secureTextEntry value="••••••••" />
        <Text style={styles.forgot}>Sifremi Unuttum</Text>
        <Pressable style={styles.mainButton} onPress={onLogin}>
          <Text style={styles.mainButtonText}>Giris Yap</Text>
        </Pressable>

        <Text style={styles.footerHelp}>
          Hesabınız yok mu? <Text style={styles.footerLink}>Yönetime Basvurun</Text>
        </Text>
      </View>
    </ScreenContainer>
  );
}

function HomeScreen({ onOpenFaultForm, onOpenMessageForm }) {
  return (
    <ScrollView contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Merhaba, Ahmet</Text>
      <Text style={styles.headerSub}>A Blok, Daire 12</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Güncel Borç Bakiyesi</Text>
        <Text style={styles.balanceAmount}>1.250,00 ₺</Text>
        <Text style={styles.balanceDate}>Son ödeme tarihi: 15 Nisan 2026</Text>
      </View>

      <Text style={styles.sectionTitle}>Hızlı Islemler</Text>
      <View style={styles.quickRow}>
        <QuickAction title="Arıza Bildir" icon="◉" onPress={onOpenFaultForm} />
        <QuickAction title="Yönetime Yaz" icon="✉" onPress={onOpenMessageForm} />
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Son Duyurular</Text>
        <Text style={styles.link}>Tümü</Text>
      </View>
      {announcements.slice(0, 2).map((item) => (
        <AnnouncementCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

function AnnouncementScreen() {
  return (
    <ScrollView contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Duyurular</Text>
      <Text style={styles.headerSub}>Yönetimden gelen mesajlar</Text>
      {announcements.map((item) => (
        <AnnouncementCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

function FinanceScreen() {
  return (
    <ScrollView contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Geçmis Islemler</Text>
      <Text style={styles.headerSub}>Önceki dönemlere ait ödemeleriniz</Text>
      {payments.map((item) => (
        <View key={item.id} style={styles.paymentCard}>
          <View style={styles.paymentIcon}>
            <Text style={styles.paymentIconText}>✓</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>{item.title}</Text>
            <Text style={styles.paymentDate}>{item.date}</Text>
          </View>
          <View>
            <Text style={styles.paymentAmount}>{item.amount}</Text>
            <Text style={styles.paymentStatus}>Ödendi</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function AdminScreen({ onLogout }) {
  const [adminTab, setAdminTab] = useState('duyuru');
  const [siteName, setSiteName] = useState('');
  const [apartmentName, setApartmentName] = useState('');
  const [flatName, setFlatName] = useState('');
  const [selectedSiteId, setSelectedSiteId] = useState('s1');
  const [selectedApartmentId, setSelectedApartmentId] = useState('a1');
  const [reportMessage, setReportMessage] = useState('');
  const [selectedDebtorDueId, setSelectedDebtorDueId] = useState('');
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementAudience, setNewAnnouncementAudience] = useState('');
  const [sites, setSites] = useState([
    {
      id: 's1',
      name: 'Günesli Konakları',
      apartments: [
        { id: 'a1', name: 'A Blok', flats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
        { id: 'a2', name: 'B Blok', flats: ['1', '2', '3', '4', '5', '6', '7', '8'] },
      ],
    },
  ]);

  const [adminAnnouncements, setAdminAnnouncements] = useState([
    { id: 'a1', title: 'Asansör Bakımı', date: 'Bugün 10:00', status: 'Yayında', audience: 'Tüm Bloklar' },
    { id: 'a2', title: 'Bahar Temizliği', date: '20 Mart 2026', status: 'Planlandı', audience: 'Ortak Alanlar' },
    { id: 'a3', title: 'Otopark Çizgileri', date: '15 Mart 2026', status: 'Taslak', audience: 'B Blok' },
  ]);

  const adminRequests = [
    { id: 't1', title: 'Su kaçağı kontrolü', location: 'B Blok / Daire 6', priority: 'Yüksek', state: 'Açık' },
    { id: 't2', title: 'Kapı kilidi arızası', location: 'A Blok / Giriş', priority: 'Orta', state: 'Atandı' },
    { id: 't3', title: 'Bahçe aydınlatması', location: 'Site Bahçesi', priority: 'Düşük', state: 'Bekliyor' },
  ];

  const adminDues = [
    { id: 'd1', site: 'Günesli Konakları', month: 'Nisan 2026', total: '145.000 ₺', collected: '132.500 ₺', ratio: '91%' },
    { id: 'd2', site: 'Günesli Konakları', month: 'Mart 2026', total: '145.000 ₺', collected: '138.000 ₺', ratio: '95%' },
    { id: 'd3', site: 'Günesli Konakları', month: 'Subat 2026', total: '145.000 ₺', collected: '131.000 ₺', ratio: '90%' },
  ];

  const debtorsByDueId = {
    d1: [
      { flat: 'A Blok / 6', amount: '1.250 ₺' },
      { flat: 'A Blok / 11', amount: '1.250 ₺' },
      { flat: 'B Blok / 3', amount: '1.250 ₺' },
    ],
    d2: [
      { flat: 'A Blok / 2', amount: '1.100 ₺' },
      { flat: 'B Blok / 5', amount: '1.100 ₺' },
    ],
    d3: [{ flat: 'B Blok / 1', amount: '1.100 ₺' }],
  };
  const selectedDue = adminDues.find((due) => due.id === selectedDebtorDueId);

  const selectedSite = sites.find((site) => site.id === selectedSiteId);
  const selectedApartment = selectedSite?.apartments.find((ap) => ap.id === selectedApartmentId);

  const addSite = () => {
    const cleanName = siteName.trim();
    if (!cleanName) return;
    const siteId = `s-${Date.now()}`;
    setSites((prev) => [...prev, { id: siteId, name: cleanName, apartments: [] }]);
    setSelectedSiteId(siteId);
    setSelectedApartmentId('');
    setSiteName('');
  };

  const addApartment = () => {
    const cleanName = apartmentName.trim();
    if (!cleanName || !selectedSiteId) return;
    const apartmentId = `a-${Date.now()}`;
    setSites((prev) =>
      prev.map((site) =>
        site.id === selectedSiteId
          ? { ...site, apartments: [...site.apartments, { id: apartmentId, name: cleanName, flats: [] }] }
          : site
      )
    );
    setSelectedApartmentId(apartmentId);
    setApartmentName('');
  };

  const addFlat = () => {
    const cleanName = flatName.trim();
    if (!cleanName || !selectedSiteId || !selectedApartmentId) return;
    setSites((prev) =>
      prev.map((site) => {
        if (site.id !== selectedSiteId) return site;
        return {
          ...site,
          apartments: site.apartments.map((ap) =>
            ap.id === selectedApartmentId ? { ...ap, flats: [...ap.flats, cleanName] } : ap
          ),
        };
      })
    );
    setFlatName('');
  };

  const addAnnouncement = () => {
    const title = newAnnouncementTitle.trim();
    const audience = newAnnouncementAudience.trim();
    if (!title || !audience) return;
    const newItem = {
      id: `a-${Date.now()}`,
      title,
      date: 'Bugün',
      status: 'Yayında',
      audience,
    };
    setAdminAnnouncements((prev) => [newItem, ...prev]);
    setNewAnnouncementTitle('');
    setNewAnnouncementAudience('');
  };

  const renderAdminContent = () => {
    if (adminTab === 'duyuru') {
      return (
        <>
          <View style={styles.adminDetailCard}>
            <Text style={styles.adminDetailTitle}>Yeni Duyuru Olustur</Text>
            <TextInput
              style={styles.adminInput}
              placeholder="Duyuru baslıgı"
              placeholderTextColor="#9aa4b2"
              value={newAnnouncementTitle}
              onChangeText={setNewAnnouncementTitle}
            />
            <TextInput
              style={styles.adminInput}
              placeholder="Hedef kitle (örn: Tüm Site)"
              placeholderTextColor="#9aa4b2"
              value={newAnnouncementAudience}
              onChangeText={setNewAnnouncementAudience}
            />
            <Pressable style={styles.adminActionButton} onPress={addAnnouncement}>
              <Text style={styles.adminActionButtonText}>Duyuru Ekle</Text>
            </Pressable>
          </View>
          {adminAnnouncements.map((item) => (
            <View key={item.id} style={styles.adminDetailCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.adminDetailTitle}>{item.title}</Text>
                <Text style={styles.adminChipBlue}>{item.status}</Text>
              </View>
              <Text style={styles.adminDetailMeta}>{item.date}</Text>
              <Text style={styles.adminDetailMeta}>Hedef: {item.audience}</Text>
              <View style={styles.adminMiniActions}>
                <Text style={styles.adminMiniLink}>Düzenle</Text>
                <Text style={styles.adminMiniLink}>Detay</Text>
                <Text style={styles.adminMiniLink}>Arsivle</Text>
              </View>
            </View>
          ))}
        </>
      );
    }

    if (adminTab === 'talep') {
      return (
        <>
          <View style={styles.adminActionRow}>
            <Pressable style={styles.adminPrimaryBtn}>
              <Text style={styles.adminPrimaryBtnText}>Talep Havuzunu Gör</Text>
            </Pressable>
          </View>
          {adminRequests.map((item) => (
            <View key={item.id} style={styles.adminDetailCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.adminDetailTitle}>{item.title}</Text>
                <Text style={styles.adminChipOrange}>{item.priority}</Text>
              </View>
              <Text style={styles.adminDetailMeta}>{item.location}</Text>
              <Text style={styles.adminDetailMeta}>Durum: {item.state}</Text>
              <View style={styles.adminMiniActions}>
                <Text style={styles.adminMiniLink}>Personele Ata</Text>
                <Text style={styles.adminMiniLink}>Not Ekle</Text>
                <Text style={styles.adminMiniLink}>Kapat</Text>
              </View>
            </View>
          ))}
        </>
      );
    }

    if (adminTab === 'yapi') {
      return (
        <>
          <View style={styles.adminDetailCard}>
            <Text style={styles.adminDetailTitle}>Yeni Site Ekle</Text>
            <TextInput
              style={styles.adminInput}
              placeholder="Site adı"
              placeholderTextColor="#9aa4b2"
              value={siteName}
              onChangeText={setSiteName}
            />
            <Pressable style={styles.adminActionButton} onPress={addSite}>
              <Text style={styles.adminActionButtonText}>Site Ekle</Text>
            </Pressable>
          </View>

          <View style={styles.adminDetailCard}>
            <Text style={styles.adminDetailTitle}>Yeni Apartman Ekle</Text>
            <Text style={styles.adminDetailMeta}>Seçili Site: {selectedSite?.name || 'Yok'}</Text>
            <View style={styles.selectionRow}>
              {sites.map((site) => (
                <Pressable
                  key={site.id}
                  style={[styles.selectionChip, selectedSiteId === site.id && styles.selectionChipActive]}
                  onPress={() => {
                    setSelectedSiteId(site.id);
                    setSelectedApartmentId(site.apartments[0]?.id || '');
                  }}
                >
                  <Text style={[styles.selectionChipText, selectedSiteId === site.id && styles.selectionChipTextActive]}>
                    {site.name}
                  </Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={styles.adminInput}
              placeholder="Apartman/Blok adı"
              placeholderTextColor="#9aa4b2"
              value={apartmentName}
              onChangeText={setApartmentName}
            />
            <Pressable style={styles.adminActionButton} onPress={addApartment}>
              <Text style={styles.adminActionButtonText}>Apartman Ekle</Text>
            </Pressable>
          </View>

          <View style={styles.adminDetailCard}>
            <Text style={styles.adminDetailTitle}>Yeni Daire Ekle</Text>
            <Text style={styles.adminDetailMeta}>Seçili Apartman: {selectedApartment?.name || 'Yok'}</Text>
            <View style={styles.selectionRow}>
              {(selectedSite?.apartments || []).map((apartment) => (
                <Pressable
                  key={apartment.id}
                  style={[styles.selectionChip, selectedApartmentId === apartment.id && styles.selectionChipActive]}
                  onPress={() => setSelectedApartmentId(apartment.id)}
                >
                  <Text
                    style={[
                      styles.selectionChipText,
                      selectedApartmentId === apartment.id && styles.selectionChipTextActive,
                    ]}
                  >
                    {apartment.name}
                  </Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={styles.adminInput}
              placeholder="Daire no (örn: 14)"
              placeholderTextColor="#9aa4b2"
              value={flatName}
              onChangeText={setFlatName}
            />
            <Pressable style={styles.adminActionButton} onPress={addFlat}>
              <Text style={styles.adminActionButtonText}>Daire Ekle</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Eklenen Site / Apartman / Daireler</Text>
          {sites.map((site) => (
            <View key={site.id} style={styles.adminDetailCard}>
              <Text style={styles.adminDetailTitle}>{site.name}</Text>
              {site.apartments.length === 0 ? (
                <Text style={styles.adminDetailMeta}>Henüz apartman eklenmedi.</Text>
              ) : (
                site.apartments.map((apartment) => (
                  <View key={apartment.id} style={styles.adminTreeItem}>
                    <Text style={styles.adminTreeTitle}>{apartment.name}</Text>
                    <Text style={styles.adminTreeMeta}>Daire Sayısı: {apartment.flats.length}</Text>
                    <Text style={styles.adminTreeFlats}>Daireler: {apartment.flats.join(', ') || '-'}</Text>
                  </View>
                ))
              )}
            </View>
          ))}
        </>
      );
    }

    return (
      <>
        <View style={styles.adminActionRow}>
          <Pressable
            style={styles.adminPrimaryBtn}
            onPress={() => setReportMessage(`Rapor olusturuldu • ${new Date().toLocaleDateString('tr-TR')}`)}
          >
            <Text style={styles.adminPrimaryBtnText}>Ornek Rapor Olustur</Text>
          </Pressable>
        </View>
        {reportMessage ? <Text style={styles.adminSuccessText}>{reportMessage}</Text> : null}
        {adminDues.map((item) => (
          <View key={item.id} style={styles.adminDetailCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.adminDetailTitle}>{item.month}</Text>
              <Text style={styles.adminChipGreen}>Tahsilat {item.ratio}</Text>
            </View>
            <Text style={styles.adminDetailMeta}>Toplam Tahakkuk: {item.total}</Text>
            <Text style={styles.adminDetailMeta}>Toplam Tahsilat: {item.collected}</Text>
            <Text style={styles.adminDetailMeta}>Site: {item.site}</Text>
            <View style={styles.adminMiniActions}>
              <Pressable onPress={() => setSelectedDebtorDueId(item.id)}>
                <Text style={styles.adminMiniLink}>Borclular Listesi</Text>
              </Pressable>
            </View>
          </View>
        ))}
        {selectedDebtorDueId ? (
          <View style={styles.adminDetailCard}>
            <Text style={styles.adminDetailTitle}>
              {selectedDue?.site} • {selectedDue?.month} Borclular Listesi
            </Text>
            {(debtorsByDueId[selectedDebtorDueId] || []).map((debtor, index) => (
              <View key={`${debtor.flat}-${index}`} style={styles.debtorRow}>
                <View>
                  <Text style={styles.debtorFlat}>{debtor.flat}</Text>
                  <Text style={styles.debtorSite}>{selectedDue?.site}</Text>
                </View>
                <Text style={styles.debtorAmount}>{debtor.amount}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Yönetici Paneli</Text>
      <Text style={styles.headerSub}>Apartman yönetim merkezi</Text>

      <View style={styles.adminSummaryRow}>
        <View style={styles.adminSummaryCard}>
          <Text style={styles.adminSummaryValue}>124</Text>
          <Text style={styles.adminSummaryLabel}>Toplam Daire</Text>
        </View>
        <View style={styles.adminSummaryCard}>
          <Text style={styles.adminSummaryValue}>18</Text>
          <Text style={styles.adminSummaryLabel}>Açık Talep</Text>
        </View>
      </View>

      <View style={styles.adminSummaryRow}>
        <View style={styles.adminSummaryCard}>
          <Text style={styles.adminSummaryValue}>92%</Text>
          <Text style={styles.adminSummaryLabel}>Tahsilat Oranı</Text>
        </View>
        <View style={styles.adminSummaryCard}>
          <Text style={styles.adminSummaryValue}>3</Text>
          <Text style={styles.adminSummaryLabel}>Bugünkü Duyuru</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Yönetim Modülleri</Text>
      <View style={styles.adminTabs}>
        <Pressable
          style={[styles.adminTabBtn, adminTab === 'duyuru' && styles.adminTabBtnActive]}
          onPress={() => setAdminTab('duyuru')}
        >
          <Text style={[styles.adminTabText, adminTab === 'duyuru' && styles.adminTabTextActive]}>Duyuru</Text>
        </Pressable>
        <Pressable
          style={[styles.adminTabBtn, adminTab === 'talep' && styles.adminTabBtnActive]}
          onPress={() => setAdminTab('talep')}
        >
          <Text style={[styles.adminTabText, adminTab === 'talep' && styles.adminTabTextActive]}>Talep</Text>
        </Pressable>
        <Pressable
          style={[styles.adminTabBtn, adminTab === 'aidat' && styles.adminTabBtnActive]}
          onPress={() => setAdminTab('aidat')}
        >
          <Text style={[styles.adminTabText, adminTab === 'aidat' && styles.adminTabTextActive]}>Aidat</Text>
        </Pressable>
        <Pressable
          style={[styles.adminTabBtn, adminTab === 'yapi' && styles.adminTabBtnActive]}
          onPress={() => setAdminTab('yapi')}
        >
          <Text style={[styles.adminTabText, adminTab === 'yapi' && styles.adminTabTextActive]}>Yapılar</Text>
        </Pressable>
      </View>
      {renderAdminContent()}

      <Pressable style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Yönetici Cıkısı</Text>
      </Pressable>
    </ScrollView>
  );
}

function ProfileScreen({ onLogout }) {
  return (
    <ScrollView contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <View style={styles.avatar} />
      <Text style={[styles.headerTitle, { textAlign: 'center', marginTop: 14 }]}>Ahmet Yılmaz</Text>
      <Text style={[styles.headerSub, { textAlign: 'center' }]}>ahmet.yilmaz@example.com</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoHead}>KONUT BILGILERI</Text>
        <InfoRow title="Site / Apartman" value="Günesli Konakları" />
        <InfoRow title="Blok / Daire" value="A Blok, Daire 12" />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoHead}>HESAP VE AYARLAR</Text>
        <SettingRow text="Kisisel Bilgiler" />
        <SettingRow text="Sözlesmeler ve Belgeler" />
        <SettingRow text="Uygulama Ayarları" />
      </View>

      <Pressable style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Cıkıs Yap</Text>
      </Pressable>
    </ScrollView>
  );
}

function QuickAction({ title, icon, onPress }) {
  return (
    <Pressable style={styles.quickCard} onPress={onPress}>
      <View style={styles.quickIcon}>
        <Text style={styles.quickIconText}>{icon}</Text>
      </View>
      <Text style={styles.quickText}>{title}</Text>
    </Pressable>
  );
}

function AnnouncementCard({ item }) {
  return (
    <View style={styles.announcementCard}>
      <View style={styles.noticeIcon}>
        <Text style={styles.noticeIconText}>◌</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.noticeTitle}>{item.title}</Text>
          {item.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.noticeDate}>{item.date}</Text>
        <Text numberOfLines={2} style={styles.noticeText}>
          {item.text}
        </Text>
      </View>
    </View>
  );
}

function InfoRow({ title, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoRowTitle}>{title}</Text>
      <Text style={styles.infoRowValue}>{value}</Text>
    </View>
  );
}

function SettingRow({ text }) {
  return (
    <Pressable style={styles.settingRow}>
      <Text style={styles.settingText}>{text}</Text>
      <Text style={styles.settingArrow}>›</Text>
    </Pressable>
  );
}

function BottomTabs({ active, onChange }) {
  const tabs = useMemo(
    () => [
      { key: 'home', label: 'Ana Sayfa', icon: '⌂' },
      { key: 'finance', label: 'Finans', icon: '◫' },
      { key: 'announcements', label: 'Duyurular', icon: '◌' },
      { key: 'profile', label: 'Profil', icon: '◎' },
    ],
    []
  );

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable key={tab.key} onPress={() => onChange(tab.key)} style={[styles.tabItem, isActive && styles.tabItemActive]}>
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ResidentActionScreen({ type, onBack }) {
  const [subject, setSubject] = useState('');
  const [detail, setDetail] = useState('');
  const [sent, setSent] = useState(false);
  const isFault = type === 'fault';

  return (
    <ScrollView contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.inlineBackButton} onPress={onBack}>
        <Text style={styles.inlineBackText}>‹ Geri</Text>
      </Pressable>
      <Text style={styles.headerTitle}>{isFault ? 'Arıza Bildir' : 'Yönetime Yaz'}</Text>
      <Text style={styles.headerSub}>
        {isFault ? 'Arızayı detaylı iletebilirsiniz' : 'Yönetim ile mesajlasma ekranı'}
      </Text>

      <View style={styles.residentFormCard}>
        <Text style={styles.inputLabel}>{isFault ? 'Arıza Baslıgı' : 'Mesaj Baslıgı'}</Text>
        <TextInput
          style={styles.input}
          placeholder={isFault ? 'Örn: Asansör calısmıyor' : 'Örn: Ortak alan talebi'}
          placeholderTextColor="#9aa4b2"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.inputLabel}>Detay</Text>
        <TextInput
          style={styles.residentTextArea}
          multiline
          textAlignVertical="top"
          placeholder={isFault ? 'Arızayı acıklayın...' : 'Mesajınızı yazın...'}
          placeholderTextColor="#9aa4b2"
          value={detail}
          onChangeText={setDetail}
        />

        <Pressable
          style={styles.mainButton}
          onPress={() => {
            if (!subject.trim() || !detail.trim()) return;
            setSent(true);
          }}
        >
          <Text style={styles.mainButtonText}>{isFault ? 'Arıza Bildirimi Gönder' : 'Mesajı Gönder'}</Text>
        </Pressable>
        {sent ? (
          <Text style={styles.adminSuccessText}>
            {isFault ? 'Arıza kaydı yönetime iletildi.' : 'Mesajınız yönetime iletildi.'}
          </Text>
        ) : null}
      </View>

      <Pressable style={styles.secondaryButton} onPress={onBack}>
        <Text style={styles.secondaryButtonText}>Ana Sayfaya Dön</Text>
      </Pressable>
    </ScrollView>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('resident');
  const [sessionRole, setSessionRole] = useState('resident');
  const [activeTab, setActiveTab] = useState('home');
  const [residentAction, setResidentAction] = useState(null);

  if (!isLoggedIn) {
    return (
      <LoginScreen
        role={role}
        setRole={setRole}
        onLogin={() => {
          setSessionRole(role);
          setIsLoggedIn(true);
          setActiveTab('home');
        }}
      />
    );
  }

  if (sessionRole === 'manager') {
    return (
      <ScreenContainer>
        <AdminScreen
          onLogout={() => {
            setIsLoggedIn(false);
            setRole('resident');
            setSessionRole('resident');
          }}
        />
      </ScreenContainer>
    );
  }

  let body = (
    <HomeScreen onOpenFaultForm={() => setResidentAction('fault')} onOpenMessageForm={() => setResidentAction('message')} />
  );
  if (activeTab === 'finance') body = <FinanceScreen />;
  if (activeTab === 'announcements') body = <AnnouncementScreen />;
  if (activeTab === 'home' && residentAction) {
    body = <ResidentActionScreen type={residentAction} onBack={() => setResidentAction(null)} />;
  }
  if (activeTab === 'profile')
    body = (
      <ProfileScreen
        onLogout={() => {
          setIsLoggedIn(false);
          setRole('resident');
          setSessionRole('resident');
        }}
      />
    );

  return (
    <ScreenContainer>
      {body}
      <BottomTabs
        active={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') {
            setResidentAction(null);
          } else {
            setResidentAction(null);
          }
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  fakeStatus: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTime: { color: COLORS.text, fontWeight: '600' },
  statusDots: { color: COLORS.text, fontSize: 13, letterSpacing: 1 },
  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 110,
    gap: 12,
  },
  headerTitle: { fontSize: 42 / 2, fontWeight: '800', color: COLORS.text },
  headerSub: { fontSize: 28 / 2, color: COLORS.muted, marginTop: -6 },
  balanceCard: {
    marginTop: 8,
    backgroundColor: '#3853ff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#3853ff',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceLabel: { color: '#dbe5ff', fontSize: 17 },
  balanceAmount: { color: '#fff', fontWeight: '800', fontSize: 48 / 2, marginTop: 8 },
  balanceDate: { color: '#dbe5ff', marginTop: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginTop: 8 },
  quickRow: { flexDirection: 'row', gap: 12 },
  quickCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    alignItems: 'center',
    gap: 14,
  },
  quickIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#eef4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconText: { color: COLORS.primary, fontSize: 24, fontWeight: '800' },
  quickText: { color: '#374151', fontSize: 16, fontWeight: '700' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  link: { color: COLORS.primary, fontWeight: '700' },
  announcementCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  noticeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f2f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeIconText: { color: COLORS.primary, fontWeight: '700', fontSize: 22 },
  noticeTitle: { color: COLORS.text, fontSize: 16 / 2 * 2, fontWeight: '800' },
  noticeDate: { color: COLORS.muted, marginTop: 2 },
  noticeText: { color: '#374151', marginTop: 6, lineHeight: 24 / 2 * 2 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  paymentCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#dbfff0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentIconText: { color: COLORS.green, fontWeight: '900' },
  paymentTitle: { fontSize: 30 / 2, fontWeight: '700', color: COLORS.text },
  paymentDate: { marginTop: 2, color: COLORS.muted },
  paymentAmount: { textAlign: 'right', fontSize: 32 / 2, fontWeight: '800', color: COLORS.text },
  paymentStatus: { textAlign: 'right', marginTop: 2, color: '#10b981', fontWeight: '600' },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    backgroundColor: '#e5e7eb',
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  infoHead: { fontSize: 13, letterSpacing: 1, fontWeight: '800', color: '#6b7280' },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoRowTitle: { color: '#6b7280', marginBottom: 4 },
  infoRowValue: { color: COLORS.text, fontSize: 17, fontWeight: '700' },
  settingRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: { color: COLORS.text, fontSize: 18 / 2 * 2, fontWeight: '600' },
  settingArrow: { color: '#94a3b8', fontSize: 24 },
  logoutBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffc7d3',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: { color: COLORS.danger, fontSize: 28 / 2, fontWeight: '700' },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingBottom: 18,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tabItemActive: { backgroundColor: '#edf2ff' },
  tabIcon: { color: '#94a3b8', fontSize: 21 },
  tabIconActive: { color: COLORS.primary },
  tabLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  tabLabelActive: { color: COLORS.primary },
  loginContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
  },
  brandImage: {
    width: 220,
    height: 120,
    alignSelf: 'center',
    marginTop: 8,
  },
  appSubtitle: { textAlign: 'center', color: COLORS.muted, marginTop: 4, fontSize: 16 / 2 * 2 },
  roleSwitch: {
    marginTop: 28,
    flexDirection: 'row',
    backgroundColor: '#eef0f4',
    borderRadius: 12,
    padding: 3,
  },
  roleBtn: { flex: 1, borderRadius: 9, paddingVertical: 10, alignItems: 'center' },
  roleBtnActive: { backgroundColor: '#fff' },
  roleText: { color: '#4b5563', fontWeight: '600' },
  roleTextActive: { color: '#111827', fontWeight: '700' },
  inputLabel: { marginTop: 16, color: '#374151', fontSize: 16, fontWeight: '600' },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#d9deea',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 17,
    color: COLORS.text,
  },
  forgot: {
    marginTop: 14,
    textAlign: 'right',
    color: COLORS.primary,
    fontWeight: '600',
  },
  mainButton: {
    marginTop: 28,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  mainButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  residentFormCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  residentTextArea: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#d9deea',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: COLORS.text,
    minHeight: 120,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#c9d4f5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  inlineBackButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#eaf0ff',
    marginBottom: 2,
  },
  inlineBackText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  footerHelp: {
    marginTop: 'auto',
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 16,
  },
  footerLink: { color: COLORS.primary, fontWeight: '700' },
  adminSummaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  adminSummaryCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  adminSummaryValue: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  adminSummaryLabel: {
    marginTop: 6,
    color: COLORS.muted,
    fontWeight: '600',
  },
  adminTabs: {
    marginTop: 8,
    backgroundColor: '#e9edf8',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 3,
    gap: 4,
  },
  adminTabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  adminTabBtnActive: {
    backgroundColor: '#ffffff',
  },
  adminTabText: {
    color: '#4b5563',
    fontWeight: '700',
  },
  adminTabTextActive: {
    color: COLORS.primary,
  },
  adminActionRow: {
    marginTop: 10,
  },
  adminSuccessText: {
    color: '#047857',
    fontWeight: '700',
    marginTop: 4,
  },
  adminPrimaryBtn: {
    backgroundColor: '#eef3ff',
    borderWidth: 1,
    borderColor: '#d6e2ff',
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center',
  },
  adminPrimaryBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  adminDetailCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    marginTop: 4,
  },
  adminDetailTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  adminDetailMeta: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
  },
  adminMiniActions: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 16,
  },
  adminMiniLink: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  adminInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d9deea',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: COLORS.text,
  },
  adminActionButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  adminActionButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  selectionRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectionChip: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#edf1f8',
  },
  selectionChipActive: {
    backgroundColor: '#dce7ff',
  },
  selectionChipText: {
    color: '#4b5563',
    fontWeight: '600',
    fontSize: 12,
  },
  selectionChipTextActive: {
    color: COLORS.primary,
  },
  adminTreeItem: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
    paddingTop: 10,
  },
  adminTreeTitle: {
    color: COLORS.text,
    fontWeight: '700',
  },
  adminTreeMeta: {
    marginTop: 2,
    color: COLORS.muted,
    fontSize: 12,
  },
  adminTreeFlats: {
    marginTop: 3,
    color: '#334155',
    fontSize: 12,
  },
  debtorRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  debtorFlat: {
    color: '#334155',
    fontWeight: '600',
  },
  debtorSite: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  debtorAmount: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  adminChipBlue: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: '#eaf0ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  adminChipOrange: {
    color: '#b45309',
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: '#fff2dd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  adminChipGreen: {
    color: '#047857',
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
});
