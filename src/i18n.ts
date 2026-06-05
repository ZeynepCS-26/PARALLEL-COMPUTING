export const i18n = {
  en: {
    nav: {
      home: "Home",
      learn: "Syllabus",
      workspace: "Workspace",
      examPrep: "Exam Prep",
      profile: "Profile"
    },
    home: {
      title: "Parallel Architectures",
      subtitle: "Accelerate your code. Dive into high-performance computing, GPU processing, message passing, and shared memory execution with an interactive AI environment.",
      start: "Explore Curriculum",
      workspace: "Launch Workspace"
    },
    workspace: {
      title: "Parallel Workspace",
      chatTitle: "AI Programming Assistant",
      tutorTab: "Console & Chat",
      altTab: "Arch Guidelines",
      placeholder: "Ask about Pthreads, CUDA arrays, MPI_Bcast...",
      runCode: "Run Simulation",
      saveWork: "Save to Profile",
      alternatives: {
        title: "Algorithmic Paradigms",
        desc: "In scalable systems, a single sequence has multiple architectural solutions. Consider performance tradeoffs between serial execution, message passing (MPI), and thread synchronization (Pthreads).",
        serial: "Sequential (SISD): Single processor processes the entire dataset. Safe but bottlenecked O(N).",
        mpi: "Message Passing (MPI / Distributed): Ranks handle partitions. Leverages collective operations like MPI_Scatter, MPI_Reduce for O(log N) efficiency.",
        pthreads: "Shared Memory (Pthreads): Threads share address space but require careful mutex locks to prevent deadlocks and race conditions.",
        pipeline: "Pipeline Processing: Breaks the task into sequential stages assigned to different processors, reducing latency across large varied data loads."
      },
      codePlaceholder: "// Parallel Implementation Entry Point\n\n#include <stdio.h>\n#include <mpi.h>\n\nint main(int argc, char **argv) {\n  int rank, size;\n  MPI_Init(&argc, &argv);\n  MPI_Comm_size(MPI_COMM_WORLD, &size);\n  MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n\n  // Computation Logic\n\n  MPI_Finalize();\n  return 0;\n}"
    },
    learn: {
      title: "Interactive Syllabus",
      modules: [
        { title: "1. Intro to Parallel Architectures", desc: "Flynn's Taxonomy (SISD, SIMD, MISD, MIMD), CPU vs. GPU throughput characteristics.", color: "emerald" },
        { title: "2. Performance Limits", desc: "Amdahl's Law, Speedup bounds (S(p)), Overhead, and Gustafson's Law.", color: "cyan" },
        { title: "3. Message Passing Interface Basics", desc: "Setting up MPI environments, Ranks, and Point-to-Point Messaging (MPI_Send, MPI_Recv).", color: "sky" },
        { title: "4. Collective Communication", desc: "Synchronized data distribution with MPI_Bcast, MPI_Scatter, MPI_Gather, and MPI_Reduce.", color: "amber" },
        { title: "5. Shared Memory execution", desc: "UNIX Fork-Join mechanisms vs Pthreads (Lightweight processes).", color: "rose" },
        { title: "6. Thread Synchronization", desc: "Critical Sections, Mutex Locks (pthread_mutex_lock), Condition Variables, and avoiding Deadlocks.", color: "fuchsia" },
        { title: "7. CUDA & GPU Programming", desc: "Host vs Device memory, SIMT execution model, Block/Grid/Thread hierarchies, and writing parallel kernels.", color: "emerald" },
        { title: "8. Advanced GPU Optimization", desc: "Memory Coalescing, Shared Memory (__shared__), __syncthreads(), and Atomic Operations (atomicAdd).", color: "teal" },
        { title: "9. Pipeline Processing", desc: "Space-Time logic, Instruction pipelining, and continuous throughput over varied data loads.", color: "cyan" },
        { title: "10. Divide & Conquer", desc: "Recursive parallelism, Bucket Sort algorithms, and N-Body Simulation approximations (Barnes-Hut).", color: "amber" },
        { title: "11. Dynamic Load Balancing", desc: "Static vs. Dynamic load allocation, Centralized Task Pools, and Worker-Sender methods.", color: "orange" },
        { title: "12. Distributed Termination", desc: "Managing global process termination using Ack messages and Distributed Token Passing.", color: "rose" }
      ],
      startModule: "Start Module"
    },
    exams: {
      title: "Practice & Evaluation",
      note: "Brush up on complex computational hurdles and theoretical limits.",
      dynamicTitle: "Infinite Exam Generator (500+ Items)",
      dynamicDesc: "Access our dynamic bank of university-level questions. Select a topic and difficulty to generate rigorous academic questions via AI.",
      topicSelect: "Select academic topic",
      difficultySelect: "Select difficulty",
      generateBtn: "Generate Exam Core",
      generating: "Compiling Questions...",
      showAnswer: "Reveal Solution",
      hideAnswer: "Hide Solution",
      q1: "Q1: Explain Amdahl's Law and its theoretical limitation.",
      a1: "Amdahl's Law, S(p) = t_s / (ft_s + (1-f)t_s/p), observes that the maximum speedup of a system is strictly limited by its sequential fraction (f). Even with infinite processors, the speedup asymptotically approaches 1/f.",
      q2: "Q2: Distinguish between 'MPI_Bcast' and 'MPI_Scatter'.",
      a2: "MPI_Bcast copies the exact identical data from the root node to all collaborating nodes. MPI_Scatter partitions an array sequentially, dispatching distinct pieces to distinct nodes (e.g., dividing workload).",
      q3: "Q3: What causes a Deadlock in Shared Memory (Pthreads)?",
      a3: "Deadlock occurs commonly via circular wait, where Thread 1 holds Resource A waiting for B, while Thread 2 holds Resource B waiting for A. Proper mutually exclusive locks (mutex) ordering or utilizing trylock routines mitigates this.",
      q4: "Q4: Compare Static vs Dynamic Load Balancing.",
      a4: "Static balancing (e.g., Round Robin) preemptively assigns tasks but suffers if task duration varies. Dynamic balancing (e.g., Centralized Task Pool) requests tasks continuously, yielding higher operating efficiency at the cost of communication overhead."
    },
    profile: {
      title: "Developer Profile",
      completed: "Completed Workspaces",
      publicProfile: "Public Visibility",
      privateProfile: "Private Visibility",
      noTasks: "No execution logs found. Run a simulation to map your progress."
    }
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      learn: "Müfredat",
      workspace: "Çalışma Alanı",
      examPrep: "Sınav Hazırlık",
      profile: "Profil"
    },
    home: {
      title: "Paralel Mimariler",
      subtitle: "Kodunuzu hızlandırın. Etkileşimli bir yapay zeka alanında yüksek performanslı hesaplama, GPU işleme, MPI mesaj geçişi ve ortak bellek yürütmelerinin derinliklerine dalın.",
      start: "Müfredatı Keşfet",
      workspace: "Çalışma Alanını Aç"
    },
    workspace: {
      title: "Paralel Çalışma Alanı",
      chatTitle: "AI Kod Asistanı",
      tutorTab: "Konsol ve Sohbet",
      altTab: "Mimari Kurallar",
      placeholder: "Pthreads, CUDA veya MPI_Bcast hakkında sor...",
      runCode: "Simüle Et",
      saveWork: "Profile Kaydet",
      alternatives: {
        title: "Algoritmik Paradigmalar",
        desc: "Ölçeklenebilir sistemlerde, tek bir problemin birden fazla mimari çözümü vardır. Sıralı işlem, mesaj geçişi (MPI) ve iş parçacığı (Pthread) senkronizasyonu arasındaki performans farklarını dikkate almalısınız.",
        serial: "Sıralı (SISD): Tek işlemci veri setinin tamamını işler. Güvenlidir ancak doğrusal O(N) darboğazına takılır.",
        mpi: "Mesaj Geçişi (MPI / Dağıtık): Düğümler işi parçalara böler. Ciddi oranda verim için O(log N) ölçeğinde MPI_Scatter ve MPI_Reduce gibi kolektif işlemleri kullanır.",
        pthreads: "Ortak Bellek (Pthreads): Birimler aynı bellek havuzunu paylaşır ancak Race Condition (Yarış) ve Deadlock'ı engellemek için Mutex'e ihtiyaç duyar.",
        pipeline: "İş Hattı (Pipeline): Problemi sıralı iş parçacıklarına böler. Çok yoğun işlemlerde işlemciler arası ardışık üretim hattı oluşturarak gecikmeyi düşürür."
      },
      codePlaceholder: "// Paralel Hesaplama C Giriş Noktası\n\n#include <stdio.h>\n#include <mpi.h>\n\nint main(int argc, char **argv) {\n  int rank, size;\n  MPI_Init(&argc, &argv);\n  MPI_Comm_size(MPI_COMM_WORLD, &size);\n  MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n\n  // İşlem Mantığı (Computation)\n\n  MPI_Finalize();\n  return 0;\n}"
    },
    learn: {
      title: "Kapsamlı Müfredat",
      modules: [
        { title: "1. Paralel Mimariye Giriş", desc: "Flynn Taksonomisi (SISD, SIMD, MISD, MIMD), CPU ve GPU işlem hacmi (throughput) karakteristikleri.", color: "emerald" },
        { title: "2. Performans Limitleri", desc: "Amdahl Yasası, Hızlanma çarpanı üst sınırları (S(p)), Overhead (Ek Yükler) ve Gustafson Yasası.", color: "cyan" },
        { title: "3. MPI: Mesaj Geçiş Algoritmaları", desc: "MPI Ranks, Ortam başlatma (MPI_Init) ve Noktadan Noktaya İletişim (MPI_Send, MPI_Recv).", color: "sky" },
        { title: "4. Kolektif MPI Operasyonları", desc: "Verinin ağaç yapısıyla senkron dağılımı (MPI_Bcast, MPI_Scatter, MPI_Gather, MPI_Reduce).", color: "amber" },
        { title: "5. Ortak Bellekli Sistemler", desc: "Çok Çekirdekli İşlemciler, Unix Fork-Join yapısı ve Pthreads (Hafif iplikçikler).", color: "rose" },
        { title: "6. Thread Senkronizasyonu", desc: "Kritik bölgeler (Critical Sections), Kilit Mekanizmaları (Mutex), Koşul Değişkenleri ve Deadlock analizleri.", color: "fuchsia" },
        { title: "7. CUDA ile GPU Programlama", desc: "Host-Device Modeli, SIMT Mimarisi, Kernel yazımı ve Thread/Block/Grid indeksleme mekanizmaları.", color: "emerald" },
        { title: "8. GPU Optimizasyonları", desc: "Bellek Hiyerarşisi, Coalesced (birleştirilmiş) Erişim, Shared Memory ve Atomic İşlemler (atomicAdd).", color: "teal" },
        { title: "9. İş Hattı (Pipeline) Kurulumu", desc: "Uzay-Zaman diyagramları ve farklı verilerin ardışık evrelerde kesintisiz geçişinin (throughput) sağlanması.", color: "cyan" },
        { title: "10. Böl-Yönet (Divide & Conquer)", desc: "Sıralama algoritmalarının paralelleştirilmesi (Bucket Sort), Sayısal İntegraller ve N-Cisim Problemi (Barnes-Hut).", color: "amber" },
        { title: "11. Dinamik Yük Dengeleme", desc: "Sabit ve Dinamik metotlar arası farklar, İş Havuzu mantığı (Task Pools) ve İş İstek (polling) algoritmaları.", color: "orange" },
        { title: "12. Dağıtık Sonlandırma Tespiti", desc: "Kapanış onay mekanizmaları (Ack mesajları) ve Çift-Geçişli Zincir (Token Passing) mantığı.", color: "rose" }
      ],
      startModule: "Modülü Çalıştır"
    },
    exams: {
      title: "Sınav Değerlendirme Modülü",
      note: "Paralel programlamanın zorlu ve teorik sınırlarını hatırlayın.",
      dynamicTitle: "Sonsuz Soru Bankası (500+ Soru)",
      dynamicDesc: "Üniversite düzeyindeki dinamik soru bankamıza erişin. Akademik zorlukta yeni sorular üretmek için konu ve zorluk seviyesi seçin.",
      topicSelect: "Akademik konu seçin",
      difficultySelect: "Zorluk seviyesi seçin",
      generateBtn: "Soru Üret",
      generating: "Sorular Derleniyor...",
      showAnswer: "Çözümü Göster",
      hideAnswer: "Çözümü Gizle",
      q1: "S1: Amdahl Yasası kavramını ve teorik limitini açıklayınız.",
      a1: "Amdahl Yasası, S(p) = t_s / (ft_s + (1-f)t_s/p) formülüyle, sistemin hızlanma ihtimalinin sıralı işleyen (f) koda bağlı olduğunu belirtir. Sonsuz işlemci de eklense, hızlanma limiti 1/f'yi aşamaz.",
      q2: "S2: 'MPI_Bcast' ile 'MPI_Scatter' fonksiyonlarını kıyaslayınız.",
      a2: "MPI_Bcast (Yayın), aynı verinin tamamını (kopyasını) kök düğümden (root) iletişim grubundaki tüm düğümlere gönderir. MPI_Scatter (Dağıtım) ise asıl diziyi parçalara böler ve her parçayı sırasıyla farklı süreçlere tahsis eder.",
      q3: "S3: Ortak Bellekli sistemlerde (Pthreads) Deadlock (Ölü Kilit) nasıl meydana gelir?",
      a3: "Deadlock, genellikle dairesel bir kaynak bekleme durumunda (Circular Wait) oluşur. İşlemci 1 Kaynak A'yı kilitlerken Kaynak B'yi bekler; İşlemci 2 Kaynak B'yi kilitlerken A'yı bekliyorsa yaşanır. Kilit süreçlerini sıralı tutmak veya Trylock kullanmak çözüm üretir.",
      q4: "S4: Sabit (Static) ve Dinamik Yük Dengeleme farkları nelerdir?",
      a4: "Sabit dengeleme (örn. Round Robin) işleri baştan atar; iş yükü asimetrik olduğunda yavaşlama yaşatır. Dinamik dengeleme (örn. Merkezi İş Havuzu) anlık iş bitiminde yeni iş atar. Çok verimlidir ancak iletişim (overhead) maliyeti artar."
    },
    profile: {
      title: "Geliştirici Kayıtları",
      completed: "Başarılı Çalışmalar",
      publicProfile: "Herkese Açık Gösterim",
      privateProfile: "Gizli Gösterim",
      noTasks: "Kayıt bulunamadı. Gelişiminizi görmek için bir derleme simülasyonunu başarıyla tamamlayın."
    }
  }
};
