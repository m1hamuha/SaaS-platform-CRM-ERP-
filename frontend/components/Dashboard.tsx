import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building, TrendingUp, DollarSign } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-sm">
          <div className="p-6">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              CRM/ERP Platform
            </div>
          </div>
          <nav className="px-4 pb-4" aria-label="Main navigation">
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start bg-accent text-accent-foreground" aria-current="page">
                  <TrendingUp className="mr-2 h-4 w-4" aria-hidden="true" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                  Customers
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Building className="mr-2 h-4 w-4" aria-hidden="true" />
                  Organizations
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" aria-hidden="true" />
                  Reports
                </Button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome to your CRM/ERP platform
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">Monthly growth</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Customers</CardTitle>
                <CardDescription>Latest customer additions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium" aria-hidden="true">
                      JD
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-sm font-medium" aria-hidden="true">
                      JS
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Jane Smith</p>
                      <p className="text-xs text-muted-foreground">jane@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-medium" aria-hidden="true">
                      MB
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Mike Brown</p>
                      <p className="text-xs text-muted-foreground">mike@example.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <span className="text-sm text-green-700 dark:text-green-400">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API</span>
                    <span className="text-sm text-green-700 dark:text-green-400">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Redis Cache</span>
                    <span className="text-sm text-green-700 dark:text-green-400">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Message Queue</span>
                    <span className="text-sm text-yellow-700 dark:text-yellow-400">Warning</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}