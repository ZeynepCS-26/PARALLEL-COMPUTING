### 4. YENİ: Paralel Hesaplama & Performans Analiz Web Sitesi
Message Passing Interface (MPI) ile geliştirdiğin yüksek başarımlı sıralama algoritmalarının, bir web arayüzü ile nasıl entegre çalıştığını gösterir. Bu şema; büyük verinin ne kadar hızlı işlendiğini ve sistem kaynaklarının ne kadar verimli kullanıldığını (değerli sonuçları) vurgular.
```mermaid
graph TD
    subgraph Web[🌐 Paralel Hesaplama Web Analiz Ekranı]
        A[ Kullanıcı Web Arayüzü]
        B[ Performans Görselleştirme<br/>Kazanılan Zaman & Hız Analizi]
    end
    
    subgraph HPC[ Yüksek Başarımlı Hesaplama <br/> ]
        C((Master Node))
        D[Worker Node 1]
        E[Worker Node 2]
        F[Worker Node N]
    end
    
    A -->|Büyük Veri Seti <br/> İstek Gönderimi| C
    C -->|Görevi Böl | D
    C -->|Görevi Böl | E
    C -->|Görevi Böl | F

    
    D -->|Sıralanmış Alt Veri| C
    E -->|Sıralanmış Alt Veri| C
    F -->|Sıralanmış Alt Veri| C
    C -->|İşlem Süresi ve<br/>CPU/RAM Verimliliği| B
    
    style A fill:#1a1a2e,stroke:#e94560,stroke-width:1px,color:#fff
    style B fill:#16213e,stroke:#0f3460,stroke-width:1px,color:#fff
    style C fill:#e94560,stroke:#fff,stroke-width:1px,color:#fff
    style D fill:#0f3460,stroke:#fff,stroke-width:1px,color:#fff
    style E fill:#0f3460,stroke:#fff,stroke-width:1px,color:#fff
    style F fill:#0f3460,stroke:#fff,stroke-width:1px,color:#fff
