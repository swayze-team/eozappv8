"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SettingsProps {
  user: any
  onLogout: () => void
}

export function Settings({ user, onLogout }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    teamMessages: true,
    matchResults: true,
    teamEvents: true,
    newsUpdates: false,
  })

  return (
    <div className="p-8 space-y-6 custom-scrollbar">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Paramètres</h2>
        <p className="text-muted-foreground text-lg">Gérez votre profil et vos préférences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Profil Discord</h3>
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage
              src={user.avatar || `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
              {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-foreground">{user.username}</h4>
            <p className="text-sm text-muted-foreground">#{user.discriminator || "0000"}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">En ligne</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur Discord</Label>
            <Input id="username" value={user.username} disabled className="bg-secondary/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email || "Non disponible"}
              disabled
              className="bg-secondary/50"
            />
          </div>
        </div>
      </Card>

      {/* Epic Games Settings */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Compte Epic Games</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="epic">Nom Epic Games</Label>
            <Input id="epic" placeholder="Entrez votre nom Epic Games..." className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform">Plateforme principale</Label>
            <Select defaultValue="pc">
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="ps">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="switch">Nintendo Switch</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-primary text-primary-foreground h-12 w-full hover:scale-[1.02] transition-transform font-semibold">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Lier le compte Epic Games
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Notifications</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Messages d'équipe</p>
              <p className="text-sm text-muted-foreground">Recevez les notifications des messages du chat</p>
            </div>
            <Switch
              checked={notifications.teamMessages}
              onCheckedChange={(checked) => setNotifications({ ...notifications, teamMessages: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Résultats de match</p>
              <p className="text-sm text-muted-foreground">Notifications après chaque match terminé</p>
            </div>
            <Switch
              checked={notifications.matchResults}
              onCheckedChange={(checked) => setNotifications({ ...notifications, matchResults: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Événements d'équipe</p>
              <p className="text-sm text-muted-foreground">Rappels pour les tournois et entraînements</p>
            </div>
            <Switch
              checked={notifications.teamEvents}
              onCheckedChange={(checked) => setNotifications({ ...notifications, teamEvents: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Actualités Fortnite</p>
              <p className="text-sm text-muted-foreground">Recevez les dernières news du jeu</p>
            </div>
            <Switch
              checked={notifications.newsUpdates}
              onCheckedChange={(checked) => setNotifications({ ...notifications, newsUpdates: checked })}
            />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Apparence</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Thème</Label>
            <Select defaultValue="dark">
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Sombre (Recommandé)</SelectItem>
                <SelectItem value="light">Clair</SelectItem>
                <SelectItem value="auto">Automatique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Langue</Label>
            <Select defaultValue="fr">
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Confidentialité</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Profil public</p>
              <p className="text-sm text-muted-foreground">Permettre aux autres de voir vos stats</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Afficher le statut en ligne</p>
              <p className="text-sm text-muted-foreground">Les membres peuvent voir si vous êtes en ligne</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* About */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
        <h3 className="text-2xl font-bold mb-4 text-foreground">À propos</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="font-mono text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Build</span>
            <span className="font-mono text-foreground">2024.11.26</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plateforme</span>
            <span className="font-mono text-foreground">Web App</span>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <h3 className="text-2xl font-bold mb-4 text-destructive">Zone de danger</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Une fois déconnecté, vous devrez vous reconnecter avec Discord pour accéder à nouveau à l'application.
        </p>
        <Button
          onClick={onLogout}
          variant="destructive"
          className="w-full h-12 font-semibold hover:scale-[1.02] transition-transform"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Se déconnecter
        </Button>
      </Card>
    </div>
  )
}
