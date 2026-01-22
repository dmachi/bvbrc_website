#!/bin/bash
# Post-install script to create symlinks and apply MSA patch
# This allows webpack to resolve packages from both symlinks and webpack aliases
# Ensures compatibility with both legacy code and webpack resolution

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_JS_DIR="$SCRIPT_DIR/public/js"
MSA_DIR="$PUBLIC_JS_DIR/msa"

# =============================================================================
# 1. Create symlinks for node_modules packages
# =============================================================================

echo "Setting up symlinks..."
cd "$PUBLIC_JS_DIR" || exit 1

# Create JBrowse symlinks - these are required for proper module resolution
# Other packages (bvbrc_js_client, markdown-it, etc.) are resolved by webpack aliases

# Create jbrowse.repo symlink to node_modules/jbrowse
if [ ! -e "jbrowse.repo" ] && [ ! -L "jbrowse.repo" ]; then
  echo "Creating symlink: jbrowse.repo -> ../../node_modules/jbrowse"
  ln -s "../../node_modules/jbrowse" "jbrowse.repo"
fi

# Create JBrowse alias if jbrowse.repo exists
if [ -L "jbrowse.repo" ] || [ -d "jbrowse.repo" ]; then
  if [ ! -e "JBrowse" ] && [ ! -L "JBrowse" ]; then
    echo "Creating symlink: JBrowse -> jbrowse.repo/src/JBrowse"
    ln -s "jbrowse.repo/src/JBrowse" "JBrowse"
  fi
fi

# Setup MultiBigWig plugin if jbrowse.repo exists
if [ -d "jbrowse.repo/plugins" ]; then
  if [ ! -h "jbrowse.repo/plugins/MultiBigWig" ]; then
    ln -s ../../../node_modules/MultiBigWig jbrowse.repo/plugins/MultiBigWig
  fi
fi

echo "Symlinks setup complete"

# =============================================================================
# 2. Prepare MSA module for webpack build (apply patch only)
# =============================================================================

if [ -d "$MSA_DIR" ]; then
  echo ""
  echo "Preparing MSA module..."
  cd "$MSA_DIR" || exit 1

  # Apply patch to stat.seqs if needed
  STAT_SEQS_FILE="node_modules/stat.seqs/lib/index.js"

  if [ -f "$STAT_SEQS_FILE" ]; then
    # Check if patch has already been applied by looking for the patched content
    if ! grep -q "_byId" "$STAT_SEQS_FILE" 2>/dev/null; then
      echo "Applying stat.seqs patch..."
      # Use sed to apply the patch (more reliable than patch command)
      sed -i '' 's/"at" in seqs/"_byId" in seqs/g' "$STAT_SEQS_FILE"
      if grep -q "_byId" "$STAT_SEQS_FILE" 2>/dev/null; then
        echo "MSA patch applied successfully"
      else
        echo "WARNING: MSA patch may not have been applied"
      fi
    else
      echo "MSA patch already applied"
    fi
  fi
fi

echo ""
echo "Post-install setup complete"
