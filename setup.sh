#!/bin/bash

# Function to create directory and its parent directories if they don't exist
create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo "Created directory: $1"
    fi
}

# Create directories
create_dir "src/components"
create_dir "src/hooks"
create_dir "src/utils"
create_dir "src/styles"
create_dir "src/context"
create_dir "src/app/login"
create_dir "src/app/dashboard"
create_dir "src/app/search"
create_dir "src/app/favorites"
create_dir "src/app/profile"
create_dir "src/app/community"

# Function to create file if it doesn't exist
create_file() {
    if [ ! -f "$1" ]; then
        touch "$1"
        echo "Created file: $1"
    else
        echo "File already exists: $1"
    fi
}

# Create component files
create_file "src/components/Layout.tsx"
create_file "src/components/Header.tsx"
create_file "src/components/Footer.tsx"
create_file "src/components/Sidebar.tsx"
create_file "src/components/SubsidyCard.tsx"
create_file "src/components/SearchBar.tsx"

# Create page files
create_file "src/app/login/page.tsx"
create_file "src/app/dashboard/page.tsx"
create_file "src/app/search/page.tsx"
create_file "src/app/favorites/page.tsx"
create_file "src/app/profile/page.tsx"
create_file "src/app/community/page.tsx"

# Create utility files
create_file "src/utils/api.ts"
create_file "src/utils/auth.ts"

# Create hook files
create_file "src/hooks/useSubsidies.ts"
create_file "src/hooks/useUser.ts"

# Create context files
create_file "src/context/AuthContext.tsx"
create_file "src/context/UIContext.tsx"

echo "Project structure has been set up successfully!"