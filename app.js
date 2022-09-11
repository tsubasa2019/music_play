      const $ = document.querySelector.bind(document)
      const $$ = document.querySelectorAll.bind(document)
      const heading = $('header h2')
      const cdThumb = $('.cd-thumb')
      const audio  = $('#audio')
      const cd = $('.cd')
      const player = $('.player')
      const playBtn = $('.btn-toggle-play')
      const progress = $('#progress')
      const nextBtn = $('.btn-next')
      const prevBtn = $('.btn-prev')
      const randomBtn = $('.btn-random')
      const repeatBtn = $('.btn-repeat')
      const playlist = $('.playlist')
      const app =  {
          currentIndex: 0,
          isPlaying: false,
          isRandom: false,
          isRepeat: false,
          songs: [
          {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./assets/music/song1.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
            },
            {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./assets/music/song1.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
            },
            {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path:
                "./assets/music/song2.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
            },
            {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "./assets/music/song1.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
            },
            {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./assets/music/song1.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
            },
            {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "./assets/music/song1.mp3",
            image:
                ""
            },
            {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./assets/music/song1.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
            },
            {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./assets/music/song1.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
            },
            {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./assets/music/song1.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
            },
            {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./assets/music/song1.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
            }
          ],
          render: function() {
            const htmls = this.songs.map((song, index) => {
                return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = '${index}'>
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `
            })
            playlist.innerHTML = htmls.join("")
          },
          defineProperties: function() {
            Object.defineProperty(this, 'currentSong', {
                get: function() {
                    return this.songs[this.currentIndex]
                }
            })
            
          },
          handleEvent: function() {
            const _this = this
            //Xu li cd quay va dung
            const cdThumbAnimate =  cdThumb.animate([
                {
                    transform:'rotate(360deg)'
                }
            ],{
                duration: 10000,
                iterations: Infinity
            })
            cdThumbAnimate.pause()
            
            //Phong to thu nho cd
            const cdWidth = cd.offsetWidth
            document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }

            //Xu li khi click play
            playBtn.onclick = function() {
                if(_this.isPlaying) {
                    audio.pause()
                }else {
                    audio.play()
                }

            }
            // khi song ddc play 
            audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            //khi song dc pause 
            audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }
            //KHi tien do bai hat thay doi
            audio.ontimeupdate = function() {
                if(audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }         
            }
            //Xu li khi tu song
            progress.onchange = function(e) {
                console.log()
                const seekTime = audio.duration*e.target.value/100
                audio.currentTime = seekTime
            }
            //Khi next song
            nextBtn.onclick = function(e) {
                if(_this.isRandom) {
                    _this.playRandomSong()
                }else {
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
            //khi prev song
            prevBtn.onclick = function(e) {
                if(_this.isRandom) {
                    _this.playRandomSong()
                }else {
                    _this.prevSong()
                }
                audio.play()
                _this.render()
            }
            //Khi random song
            randomBtn.onclick = function(e) {
                _this.isRandom = !_this.isRandom
                randomBtn.classList.toggle('active', _this.isRandom)
            }

            //Xu li phat lai 1 bai hat khi bam repeat
            repeatBtn.onclick = function() {
                _this.isRepeat = !_this.isRepeat
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }
            //KHi ket thuc bai hat
            audio.onended = function() {
                if(_this.isRepeat) {
                    audio.play()
                }else {
                    nextBtn.click()
                }
            }
            // Xu li khi click vao playlist
            playlist.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)')
                if(songNode || e.target.closest('.option')) {
                    //Khi click vao song 
                    if(songNode) {
                        // songNode.getAttribute('data-index')
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()
                    }
                }
            }
          },
          scrollToActiveSong: function() {
            setTimeout(function() {
                $('.song.active').scrollIntoView({
                    behavior : "smooth",
                    block: this.currentIndex = 0 ? "center" : "nearest"
                })
            },200)
          },
          loadCurrentSong: function() {
            heading.textContent = this.currentSong.name
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
          },
          nextSong: function() {
            this.currentIndex++
            if(this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
            this.loadCurrentSong()
          },
          prevSong: function() {
            this.currentIndex--
            if(this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
            this.loadCurrentSong()
          },
          playRandomSong: function() {
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            }while(newIndex === this.currentIndex)
            this.currentIndex = newIndex
            this.loadCurrentSong()
          },
          start: function() {
            //Dinh nghia cac thuoc tinh cho Object
            this.defineProperties()
            //Lang nghe xu li cac su kien
            this.handleEvent()
            //Tai thong tin bai hat dau tien vao UI khi chay ung dung
            this.loadCurrentSong()
            //Reder playlist
            this.render()
          }
      }
      app.start()
