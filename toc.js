// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><a href="git.html"><strong aria-hidden="true">1.</strong> Git</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="git/git分支相关操作.html"><strong aria-hidden="true">1.1.</strong> git分支相关操作</a></li><li class="chapter-item "><a href="git/git开发常用操作.html"><strong aria-hidden="true">1.2.</strong> git开发常用操作</a></li><li class="chapter-item "><a href="git/git远程相关操作.html"><strong aria-hidden="true">1.3.</strong> git远程相关操作</a></li><li class="chapter-item "><a href="git/git代理相关操作.html"><strong aria-hidden="true">1.4.</strong> git代理相关操作</a></li><li class="chapter-item "><a href="git/查看git信息-设置git信息.html"><strong aria-hidden="true">1.5.</strong> 查看git信息，设置git信息</a></li><li class="chapter-item "><a href="git/gitignore使用.html"><strong aria-hidden="true">1.6.</strong> .gitignore使用</a></li><li class="chapter-item "><a href="git/git基本概念.html"><strong aria-hidden="true">1.7.</strong> git基本概念</a></li></ol></li><li class="chapter-item "><a href="博客.html"><strong aria-hidden="true">2.</strong> 博客</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="博客/方案-飞书-feishu-pages-mdbook.html"><strong aria-hidden="true">2.1.</strong> 方案：飞书 + feishu-pages + mdbook</a></li><li class="chapter-item "><a href="博客/飞书文档转化markdown测试.html"><strong aria-hidden="true">2.2.</strong> 飞书文档转化markdown测试</a></li><li class="chapter-item "><a href="博客/gitbook.html"><strong aria-hidden="true">2.3.</strong> GitBook</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="博客/gitbook/环境配置.html"><strong aria-hidden="true">2.3.1.</strong> 环境配置</a></li><li class="chapter-item "><a href="博客/gitbook/Gitbook-node端和web端详细研究.html"><strong aria-hidden="true">2.3.2.</strong> Gitbook node端和web端详细研究</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
