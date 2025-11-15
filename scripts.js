document.addEventListener('DOMContentLoaded', () => {
    // --- DASHBOARD AND USER MANAGEMENT LOGIC (10 & 11) ---

    // Sample data structure (In a real app, this would come from the server)
    const usersData = [
        { id: 3, name: 'Visitor Ravi', email: 'ravi@example.com', role: 'Visitor', status: 'Active' },
        { id: 4, name: 'Blogger Tina', email: 'tina@travel.com', role: 'Blogger', status: 'Inactive' },
        { id: 5, name: 'Guide Nithin', email: 'nithin@kudlaguide.com', role: 'Guide', status: 'Active' },
    ];

    const userTableBody = document.getElementById('user-table-body');
    
    // Function to render the user table
    const renderUserTable = (data) => {
        // Clear existing rows (if any)
        // Keep the placeholder rows in dashboard.html for initial display, 
        // but for dynamic loading, you'd usually clear them completely.
        // For simplicity, we only add the new sample data here.

        data.forEach(user => {
            const row = document.createElement('tr');
            row.dataset.userId = user.id;
            
            // Set status color based on role for visual distinction (CSS is required)
            const statusClass = user.status.toLowerCase() === 'active' ? 'active' : 'inactive';
            
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="user-role">${user.role}</td>
                <td class="user-status ${statusClass}">${user.status}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${user.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        // Add event listeners to the new action buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDeleteUser);
        });
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEditUser);
        });
    };

    // Load initial dynamic data if on the dashboard page
    if (userTableBody) {
        renderUserTable(usersData);
    }
    
    // Placeholder handlers for User Management Actions (DOM Manipulation)
    const handleDeleteUser = (e) => {
        const userId = e.target.dataset.id;
        if (confirm(`Are you sure you want to delete user ID ${userId}?`)) {
            // Logic to visually remove the row using DOM manipulation
            const row = e.target.closest('tr');
            if (row) {
                row.remove();
                // In a real app, you would also call an API to delete the user.
                alert(`User ${userId} deleted.`);
                // You would update the metric card here: total-users--
            }
        }
    };

    const handleEditUser = (e) => {
        const userId = e.target.dataset.id;
        alert(`Opening edit dialog for user ID ${userId}.`);
        // Here you would use DOM manipulation to display a modal or form
        // to edit the user's name, email, and role/permissions[cite: 49].
    };
    
    // Dashboard Sidebar Navigation (Simple Scroll/Anchor)
    const sidebarLinks = document.querySelectorAll('.dashboard-sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active-dash-link'));
            // Add active class to the clicked link
            this.classList.add('active-dash-link');
        });
    });

    // End of Dashboard Logic
    // 1. Mobile Menu Toggle Functionality [cite: 59]
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // 2. Placeholder for Dynamic Content Loading (Home Page Featured Posts) 
    const featuredPostsContainer = document.querySelector('.featured-posts .post-grid');
    if (featuredPostsContainer) {
        // In a real application, this data would come from an API/database.
        const postsData = [
            { title: "Coastal Cuisine: A Seafood Feast", summary: "Exploring the best Ghee Roast and Fish Tawa Fry spots.", link: "post-detail.html", img: "images/post-cuisine-2.jpg" },
            { title: "Mangaluru's Heritage Walk", summary: "Three historical spots you can't miss.", link: "post-detail.html", img: "images/post-heritage.jpg" }
        ];

        postsData.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post-card';
            article.innerHTML = `
                <img src="${post.img}" alt="${post.title}">
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <a href="${post.link}" class="read-more">Read More</a>
            `;
            featuredPostsContainer.appendChild(article);
        });
    }

    // 3. Simple Comment Submission Handler (on post-detail.html) [cite: 22]
    const commentForm = document.querySelector('.comment-form');
    const commentsSection = document.querySelector('.comments-section');

    if (commentForm && commentsSection) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentText = commentForm.querySelector('textarea').value;
            const authorName = commentForm.querySelector('input[type="text"]').value || 'Anonymous Visitor';
            const date = new Date().toLocaleDateString();

            if (commentText.trim() !== "") {
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <p class="comment-author">**${authorName}** | ${date}</p>
                    <p>${commentText}</p>
                `;
                
                // Append the new comment to the start of the comments list
                const commentsList = commentsSection.querySelector('h2').nextElementSibling;
                commentsList.parentNode.insertBefore(newComment, commentsList.nextElementSibling);

                // Clear the form
                commentForm.reset();
                alert('Comment posted successfully!');
            }
        });
    }

    // 4. Placeholder for Search and Filter (on blog.html) [cite: 36, 37, 57]
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput && categoryFilter) {
        // Placeholder function - implement actual filtering logic here.
        const filterPosts = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            console.log(`Searching for: ${searchTerm} in category: ${selectedCategory}`);
            // DOM manipulation logic to hide/show .full-post-card elements based on criteria
            // E.g., article.style.display = 'none'; or 'flex';
        };

        searchInput.addEventListener('input', filterPosts);
        categoryFilter.addEventListener('change', filterPosts);
    }
});
// ... existing code ...

    // --- GUIDE PAGE LOGIC (Core Feature 4) ---

    const guideSearchInput = document.getElementById('guide-search');
    const guideCards = document.querySelectorAll('.guide-card');

    if (guideSearchInput && guideCards.length > 0) {
        guideSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            guideCards.forEach(card => {
                const expertise = card.dataset.expertise.toLowerCase();
                const name = card.querySelector('h2').textContent.toLowerCase();
                
                // Check if the search term matches the name or expertise
                if (name.includes(searchTerm) || expertise.includes(searchTerm)) {
                    card.style.display = 'flex'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    }

    // Placeholder for Contact Guide button
    const contactButtons = document.querySelectorAll('.contact-guide-btn');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const guideName = e.target.closest('.guide-card').querySelector('h2').textContent;
            alert(`Opening modal to send a personalized inquiry to ${guideName}. (Functionality to be implemented with form validation.)`);
            // In a real application, this would open an interactive contact form/modal.
        });
    });

// ... end of existing code ...
// ... existing code ...

    // --- DESTINATION PAGE LOGIC (Core Feature 3) ---

    const destinationSearchInput = document.getElementById('destination-search');
    const destinationCards = document.querySelectorAll('.destination-card');

    if (destinationSearchInput && destinationCards.length > 0) {
        destinationSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            destinationCards.forEach(card => {
                const category = card.dataset.category.toLowerCase();
                const name = card.querySelector('h2').textContent.toLowerCase();
                
                // Check if the search term matches the destination name or category
                if (name.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block'; // Show the card (cards are block elements in the grid)
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    }

// ... end of existing code ...